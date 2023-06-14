import { NextFunction, Request, Response } from 'express';
import { academicSemisterServices } from './academicSemiser.service';
import catchAsync from '../../../Shared/catchAsync';

const createSemisterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemisterData } = req.body;
    const result = await academicSemisterServices.createSemister(
      academicSemisterData
    );
    next();
    res.status(200).json({
      success: true,
      message: `Semister created successfully.`,
      data: result,
    });
  }
);

export const AcademicSemisterController = { createSemisterController };
