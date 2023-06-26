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
// import pick from '../../../Shared/pick';
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

const deleteSemister = async (
  id: string
): Promise<IAcademcSemisterInterface | null> => {
  const result = await academicSemister.findByIdAndDelete(id);
  return result;
};

const updateSemister = async (
  id: string,
  payload: Partial<IAcademcSemisterInterface>
): Promise<IAcademcSemisterInterface | null> => {
  if (
    payload.code &&
    payload.title &&
    academicSemisterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semister code');
  }

  // const existingChecker = async (
  //   payload: Partial<IAcademcSemisterInterface>,
  //   payloadField: Array<keyof IAcademcSemisterInterface>,
  //   year: string | null | undefined = null
  // ) => {
  //   const x = pick(payload, payloadField);
  //   if (year) {
  //     x.year = year;
  //   }
  //   const exist = await academicSemister.findOne(x);
  //   if (exist) {
  //     throw new ApiError(
  //       httpStatus.CONFLICT,
  //       'Academic semister already exist !'
  //     );
  //   }
  // };

  // if (payload.code && payload.title && payload.year) {
  //   existingChecker(payload, ['code', 'title', 'year']);
  // } else if (payload.code && payload.title) {
  //   const semister = await academicSemister.findById(id);
  //   existingChecker(payload, ['code', 'title'], semister?.year);
  // }

  const result = await academicSemister.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const academicSemisterServices = {
  createSemister,
  getSingleSemisterService,
  getAllSemisters,
  updateSemister,
  deleteSemister,
};
