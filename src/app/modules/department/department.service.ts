import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilterRequest,
} from './detpartment.interface';
import { AcademicDepartmentModel } from './detpartment.model';

const createDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartmentModel.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};
const getSingleDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartmentModel.findById(id).populate(
    'academicFaculty'
  );
  return result;
};
const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartmentModel.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  ).populate('academicFaculty');
  return result;
};
const deleteDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartmentModel.findByIdAndDelete(id).populate(
    'academicFaculty'
  );
  return result;
};

const getAllDepartments = async (
  filters: IAcademicDepartmentFilterRequest,
  paginationOptions: IPaginationOptions
) => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);
  const { searchTerm, ...filtersFields } = filters;
  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: ['title'].map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersFields).length) {
    andCondition.push({
      $and: Object.entries(filtersFields).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await AcademicDepartmentModel.find(whereCondition)
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicDepartmentModel.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const departmentService = {
  createDepartment,
  getSingleDepartment,
  updateDepartment,
  getAllDepartments,
  deleteDepartment,
};
