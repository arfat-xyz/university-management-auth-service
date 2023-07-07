import { Request, Response } from 'express';
import catchAsync from '../../../Shared/catchAsync';
import { AuthService } from './auth.service';
import sendResponse from '../../../Shared/sendResponse';
import httpStatus from 'http-status';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import config from '../../../config';

const authLogin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.authLogin(req.body);
  const { refreshToken, ...others } = result;

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User login successfully.`,
    data: others,
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `User login successfully.`,
    data: result,
  });
});
export const AuthController = { refreshToken, authLogin };
