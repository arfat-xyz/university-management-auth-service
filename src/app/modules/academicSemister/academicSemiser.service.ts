import ApiError from '../../../errors/ApiErrors';
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

const getAllSemisters = (paginationOptions: IPaginationOptions) => {
  return paginationOptions;
};
export const academicSemisterServices = {
  createSemister,
  getAllSemisters,
};
