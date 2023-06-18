import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../Shared/catchAsync';
import sendResponse from '../../../Shared/sendResponse';
import httpStatus from 'http-status';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UserService.createUser(user);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `User created successfully.`,
      meta: null,
      data: result,
    });
    next();
  }
);

export const UserController = { createUser };
