import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../users/user.schema';
import { ILogin, ILoginUserResponse } from './auth.interface';
import config from '../../../config';
import { JWTHelpers } from '../../../helpers/jwtHelpers';

const authLogin = async (payload: ILogin): Promise<ILoginUserResponse> => {
  const { id, password } = payload;

  // const userExists = await User.findOne(
  //   { _id: id },
  //   { id: 1, password: 1, needsPasswordChange: 1 }
  // ).lean();
  const userExists = await User.userExists(id);

  // existing error
  if (!userExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  // matched password with errro
  if (
    userExists.password &&
    !(await User.isPasswordMatched(password, userExists?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect');
  }

  // Create access and refresh token
  const { id: userId, role, needsPasswordChange } = userExists;
  // jwt.sign(
  //   { id: userExists.id, role: userExists.role },
  //   config.jwt.jwt_secret as Secret,
  //   {
  //     expiresIn: config.jwt.jwt_secret_expires_in,
  //   }
  // );
  const accessToken = JWTHelpers.createToken(
    { userId, role, needsPasswordChange },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_secret_expires_in as string
  );
  const refreshToken = JWTHelpers.createToken(
    { userId, role, needsPasswordChange },
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_secret_expires_in as string
  );
  return { accessToken, refreshToken, needsPasswordChange };
};

export const AuthService = { authLogin };
