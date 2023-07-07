import { Request, Response } from 'express';
import catchAsync from '../../../Shared/catchAsync';
import { facultyService } from './faculty.service';
import sendResponse from '../../../Shared/sendResponse';
import { IAcademicFaculty, IFilterableFields } from './faculty.interface';
import httpStatus from 'http-status';
import pick from '../../../Shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { searchableFields } from './faculty.constant';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await facultyService.createFaculty(req.body);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Semister updated successfully.`,
    data: result || null,
  });
});

const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
  // console.log(req.user);
  const pagination = pick(req.query, paginationFields);
  const filters = pick(req.query, searchableFields);
  const result = await facultyService.getAllFaculty(
    pagination,
    filters as IFilterableFields
  );
  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Semister updated successfully.`,
    meta: result.meta || null,
    data: result.data || null,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await facultyService.getSingleFaculty(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Semister updated successfully.`,
    data: result || null,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData: Partial<IAcademicFaculty> = req.body;
  const result = await facultyService.updateFaculty(id, updatedData);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Semister updated successfully.`,
    data: result || null,
  });
});
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await facultyService.deleteFaculty(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Semister updated successfully.`,
    data: result || null,
  });
});

export const facultyController = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
