/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IStudent, IStudentFilters } from './student.interface';
import { studentFilterableFields } from './student.constant';
import { studentModel } from './student.model';
import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';
import { User } from '../users/user.schema';

const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
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
      $or: studentFilterableFields.map(field => ({
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
  const result = await studentModel
    .find(whereCondition)
    .populate([
      {
        path: 'academicSemister',
      },
      {
        path: 'academicDepartment',
      },
      {
        path: 'academicFaculty',
      },
    ])
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await studentModel.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await studentModel.findById(id).populate([
    {
      path: 'academicSemister',
    },
    {
      path: 'academicDepartment',
    },
    {
      path: 'academicFaculty',
    },
  ]);
  return result;
};

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const exists = await studentModel.findOne({ id });
  if (!exists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  }

  const { name, guardian, localGuardian, ...studentData } = payload;
  const updatedStudentData: Partial<IStudent> = studentData;

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const keyName = `name.${key}`;
      (updatedStudentData as any)[keyName] = name[key as keyof typeof name];
    });
  }
  if (guardian && Object.keys(guardian).length > 0) {
    Object.keys(guardian).forEach(key => {
      const keyGuardian = `guardian.${key}`;
      (updatedStudentData as any)[keyGuardian] =
        guardian[key as keyof typeof guardian];
    });
  }
  if (localGuardian && Object.keys(localGuardian).length > 0) {
    Object.keys(localGuardian).forEach(key => {
      const keyLocalGuardian = `localGuardian.${key}`;
      (updatedStudentData as any)[keyLocalGuardian] =
        localGuardian[key as keyof typeof localGuardian];
    });
  }
  const result = await studentModel.findOneAndUpdate(
    { id },
    updatedStudentData,
    {
      new: true,
    }
  );
  return result;
};
const deleteStudent = async (id: string) => {
  let result;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await User.findOneAndDelete({ student: id }, { session });
    result = await studentModel.findByIdAndDelete(id, { session }).populate([
      {
        path: 'academicSemister',
      },
      {
        path: 'academicDepartment',
      },
      {
        path: 'academicFaculty',
      },
    ]);
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    console.error('Transaction aborted:', error);
  } finally {
    session.endSession();
  }

  return result;
};

export const studentService = {
  deleteStudent,
  updateStudent,
  getSingleStudent,
  getAllStudents,
};
