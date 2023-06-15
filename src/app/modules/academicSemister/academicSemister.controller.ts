import { NextFunction, Request, Response } from 'express';
import { academicSemisterServices } from './academicSemiser.service';
import catchAsync from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import httpStatus from 'http-status';

const createSemisterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemisterData } = req.body;
    const result = await academicSemisterServices.createSemister(
      academicSemisterData
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Academic semister created successfully.`,
      data: result || null,
    });
    next();
  }
);

export const AcademicSemisterController = { createSemisterController };
