import { NextFunction, Request, Response } from 'express';
import { academicSemisterServices } from './academicSemiser.service';
import catchAsync from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../Shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IAcademcSemisterInterface } from './academicSemister.interface';

const createSemisterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemisterData } = req.body;
    const result = await academicSemisterServices.createSemister(
      academicSemisterData
    );
    sendResponse<IAcademcSemisterInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Academic semister created successfully.`,
      meta: null,
      data: result || null,
    });
    next();
  }
);
const getAllSemisters = catchAsync(
  // eslint-disable-next-line no-unused-vars
  async (req: Request, res: Response) => {
    const paginationOptions = pick(req.query, paginationFields);
    const result = await academicSemisterServices.getAllSemisters(
      paginationOptions
    );
    sendResponse<IAcademcSemisterInterface[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Academic semister created successfully.`,
      meta: result.meta,
      data: result.data || null,
    });
    // next();
  }
);
export const AcademicSemisterController = {
  createSemisterController,
  getAllSemisters,
};
