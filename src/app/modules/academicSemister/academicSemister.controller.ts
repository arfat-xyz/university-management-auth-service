import { NextFunction, Request, Response } from 'express';
import { academicSemisterServices } from './academicSemiser.service';
import catchAsync from '../../../Shared/catchAsync';
import pick from '../../../Shared/pick';
import { paginationFields } from '../../../constants/pagination';

const createSemisterController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemisterData } = req.body;
    const result = await academicSemisterServices.createSemister(
      academicSemisterData
    );
    res.status(200).json({
      success: true,
      message: `Semister created successfully.`,
      data: result,
    });
    next();
  }
);

const getAllSemisters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const paginationOptions: IPaginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy as string,
    //   sortOrder: req.query.sortOrder as 'asc' | 'desc',
    // };
    const paginationOptions = pick(req.query, paginationFields);
    console.log(paginationOptions);
    const result = await academicSemisterServices.getAllSemisters(
      paginationOptions
    );
    res.status(200).json({
      success: true,
      message: `Semisters retrive successfully.`,
      data: result,
    });
    next();
  }
);

export const AcademicSemisterController = {
  createSemisterController,
  getAllSemisters,
};
