/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';
import { User } from '../users/user.schema';
import { IFacultyUser, IFacultyUsersFilters } from './facultyUser.interface';
import { facultyUsersFilterableFields } from './facultyUser.constant';
import { facultyUserModel } from './facultyUser.model';

const getAllFacultyUsers = async (
  filters: IFacultyUsersFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFacultyUser[]>> => {
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
      $or: facultyUsersFilterableFields.map(field => ({
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
  const result = await facultyUserModel
    .find(whereCondition)
    .populate([
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
  const total = await facultyUserModel.countDocuments(whereCondition);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFacultyUsers = async (
  id: string
): Promise<IFacultyUser | null> => {
  const result = await facultyUserModel.findById(id).populate([
    {
      path: 'academicDepartment',
    },
    {
      path: 'academicFaculty',
    },
  ]);
  return result;
};

const updateFacultyUsers = async (
  id: string,
  payload: Partial<IFacultyUser>
): Promise<IFacultyUser | null> => {
  const exists = await facultyUserModel.findOne({ id });
  if (!exists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty user not found');
  }

  const { name, ...studentData } = payload;
  const updatedStudentData: Partial<IFacultyUser> = studentData;

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const keyName = `name.${key}`;
      (updatedStudentData as any)[keyName] = name[key as keyof typeof name];
    });
  }

  const result = await facultyUserModel.findOneAndUpdate(
    { id },
    updatedStudentData,
    {
      new: true,
    }
  );
  return result;
};
const deleteFacultyUsers = async (id: string) => {
  let result;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    await User.findOneAndDelete({ student: id }, { session });
    result = await facultyUserModel
      .findByIdAndDelete(id, { session })
      .populate([
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

export const FacultyUsersService = {
  deleteFacultyUsers,
  updateFacultyUsers,
  getSingleFacultyUsers,
  getAllFacultyUsers,
};
