import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiErrors';

import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';

import { IPaginationOptions } from '../../../interfaces/pagination';
import {
  academicSemisterFilterableFields,
  academicSemisterTitleCodeMapper,
} from './academicSemister.constant';
import {
  IAcademcSemisterInterface,
  IAcademicSemisterFilters,
} from './academicSemister.interface';
import { academicSemister } from './academicSemister.schema';
import httpStatus from 'http-status';
const createSemister = async (
  payload: IAcademcSemisterInterface
): Promise<IAcademcSemisterInterface> => {
  if (academicSemisterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semister code');
  }

  const result = await academicSemister.create(payload);
  return result;
};

const getAllSemisters = async (
  filters: IAcademicSemisterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademcSemisterInterface[]>> => {
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
      $or: academicSemisterFilterableFields.map(field => ({
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
  // const andCondition = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: Number(searchTerm),
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await academicSemister
    .find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await academicSemister.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemisterService = async (
  id: string
): Promise<IAcademcSemisterInterface | null> => {
  const result = await academicSemister.findById(id);
  return result;
};
const updateSemister = async (
  id: string,
  payload: Partial<IAcademcSemisterInterface>
): Promise<IAcademcSemisterInterface | null> => {
  const result = await academicSemister.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true }
  );
  return result;
};

export const academicSemisterServices = {
  createSemister,
  getSingleSemisterService,
  getAllSemisters,
  updateSemister,
};
