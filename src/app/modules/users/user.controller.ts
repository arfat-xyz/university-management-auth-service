import { Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import httpStatus from 'http-status';

const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudent(student, userData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `User created successfully.`,
      meta: null,
      data: result,
    });
  }
);
const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await UserService.createAdmin(admin, userData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `User created successfully.`,
      meta: null,
      data: result,
    });
  }
);
const createFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    const result = await UserService.createFaculty(faculty, userData);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `User created successfully.`,
      meta: null,
      data: result,
    });
  }
);

export const UserController = { createStudent, createAdmin, createFaculty };
