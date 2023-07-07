/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import catchAsync from '../../../Shared/catchAsync';

import sendResponse from '../../../Shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../Shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IStudent, IStudentFilters } from './student.interface';
import { studentService } from './student.service';
import { studentSearchableFields } from './student.constant';

const getAllStudents = catchAsync(
  // eslint-disable-next-line no-unused-vars
  async (req: Request, res: Response) => {
    // const paginationOptions: IPaginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy as string,
    //   sortOrder: req.query.sortOrder as 'asc' | 'desc',
    // };
    const paginationOptions = pick(req.query, paginationFields);
    const filters = pick(req.query, studentSearchableFields);
    const result = await studentService.getAllStudents(
      filters as IStudentFilters,
      paginationOptions
    );
    sendResponse<IStudent[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Students retrive successfully.`,
      meta: result.meta || null,
      data: result.data || null,
    });
  }
);

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const result = await studentService.getSingleStudent(req.params.id);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Student retrive successfully.`,
    data: result || null,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await studentService.updateStudent(id, updatedData);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Student updated successfully.`,
    data: result || null,
  });
});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await studentService.deleteStudent(id);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Student deleted successfully.`,
    data: result || null,
  });
});

export const StudentController = {
  getSingleStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
};
