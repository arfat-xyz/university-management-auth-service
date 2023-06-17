import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiErrors';

import { paginationHelpers } from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';

import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicSemisterTitleCodeMapper } from './academicSemister.constant';
import { IAcademcSemisterInterface } from './academicSemister.interface';
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
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademcSemisterInterface[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const result = await academicSemister
    .find({})
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  // console.log(result, skip, page, limit);
  const total = await academicSemister.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
=======
const getAllSemisters = (paginationOptions: IPaginationOptions) => {
  return paginationOptions;

};
export const academicSemisterServices = {
  createSemister,
  getAllSemisters,
};
