import { Request, Response } from 'express';
import catchAsync from '../../../Shared/catchAsync';
import { departmentService } from './department.service';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilterRequest,
} from './detpartment.interface';
import sendResponse from '../../../Shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../Shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { departmentSearchableFields } from './department.constant';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const payload: IAcademicDepartment = req.body;
  const result = await departmentService.createDepartment(payload);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Department created successfully.`,
    data: result,
  });
});
const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await departmentService.getSingleDepartment(id);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Department retrived successfully.`,
    data: result,
  });
});
const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const payload: Partial<IAcademicDepartment> = req.body;
  const result = await departmentService.updateDepartment(id, payload);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Department retrived successfully.`,
    data: result,
  });
});
const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);
  const filters = pick(req.query, departmentSearchableFields);
  const result = await departmentService.getAllDepartments(
    filters as IAcademicDepartmentFilterRequest,
    paginationOptions
  );
  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Departments retrive successfully.`,
    meta: result.meta || null,
    data: result.data || null,
  });
});
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await departmentService.deleteDepartment(id);
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Department deleted successfully.`,
    data: result,
  });
});

export const departmentController = {
  createDepartment,
  getSingleDepartment,
  updateDepartment,
  getAllDepartments,
  deleteDepartment,
};
