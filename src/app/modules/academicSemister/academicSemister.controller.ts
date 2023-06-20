import { NextFunction, Request, Response } from 'express';
import { academicSemisterServices } from './academicSemiser.service';
import catchAsync from '../../../Shared/catchAsync';

import sendResponse from '../../../Shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../Shared/pick';
import { paginationFields } from '../../../constants/pagination';
import {
  IAcademcSemisterInterface,
  IAcademicSemisterFilters,
} from './academicSemister.interface';
import { academicSemiserSearchableFields } from './academicSemister.constant';

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
      data: result || null,
    });
    next();
  }
);

const getAllSemisters = catchAsync(
  // eslint-disable-next-line no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    // const paginationOptions: IPaginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy as string,
    //   sortOrder: req.query.sortOrder as 'asc' | 'desc',
    // };
    const paginationOptions = pick(req.query, paginationFields);
    const filters = pick(req.query, academicSemiserSearchableFields);
    const result = await academicSemisterServices.getAllSemisters(
      filters as IAcademicSemisterFilters,
      paginationOptions
    );

    sendResponse<IAcademcSemisterInterface[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Semisters retrive successfully.`,
      meta: result.meta || null,
      data: result.data || null,
    });

    next();
  }
);

const getSingleSemisterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await academicSemisterServices.getSingleSemisterService(
      req.params.id
    );
    sendResponse<IAcademcSemisterInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Semister retrive successfully.`,
      data: result || null,
    });
    next();
  }
);
const updateSemister = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    const updateData = req.body;
    const result = await academicSemisterServices.updateSemister(
      id,
      updateData
    );
    sendResponse<IAcademcSemisterInterface>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Semister retrive successfully.`,
      data: result || null,
    });
    next();
  }
);

export const AcademicSemisterController = {
  createSemisterController,
  getSingleSemisterController,
  getAllSemisters,
  updateSemister,
};
