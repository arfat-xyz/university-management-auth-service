import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { IFaculty, IFilterableFields } from './faculty.interface';
import FacultyModel from './faculty.schema';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { SortOrder } from 'mongoose';
import { filterableFields } from './faculty.constant';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';

const createFaculty = async (payload: IFaculty): Promise<IFaculty> => {
  const exist = await FacultyModel.findOne(payload);
  if (exist) {
    throw new ApiError(httpStatus.CONFLICT, 'Faculty semister already exist !');
  }

  const result = await FacultyModel.create(payload);
  return result;
};

const getAllFaculty = async (
  pagination: IPaginationOptions,
  filters: IFilterableFields
): Promise<IGenericResponse<IFaculty[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(pagination);
  const { searchTerm, ...filterFields } = filters;
  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortOrder && sortBy) {
    sortCondition[sortBy] = sortOrder;
  }
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: filterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterFields).length) {
    andCondition.push({
      $and: Object.entries(filterFields).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await FacultyModel.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await FacultyModel.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await FacultyModel.findById(id);
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const result = FacultyModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = FacultyModel.findByIdAndDelete(id);
  return result;
};

export const facultyService = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
