import { Request, Response } from 'express';
import catchAsync from '../../../Shared/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../../Shared/sendResponse';
import httpStatus from 'http-status';

const authLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.authLogin(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Department created successfully.`,
    data: result,
  });
});
export const AuthController = { authLogin };
