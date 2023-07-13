import httpStatus from 'http-status';
import { JwtPayload, Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../users/user.schema';
import {
  ILogin,
  ILoginUserResponse,
  IPasswordChange,
  IRefreshTokenResponse,
} from './auth.interface';
import config from '../../../config';
import { JWTHelpers } from '../../../helpers/jwtHelpers';
import { IUser } from '../users/user.interface';

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

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifyToken = null;
  try {
    verifyToken = JWTHelpers.verifyToken(
      token,
      config.jwt.jwt_refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  // check if user exist or not
  const { userId } = verifyToken;
  const isUserExist = await User.userExists(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  const newAccessToken = JWTHelpers.createToken(
    { id: isUserExist.id, role: isUserExist.role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_secret_expires_in as string
  );
  return { accessToken: newAccessToken };
};
const changePassword = async (
  passwordData: IPasswordChange,
  user: JwtPayload | null
): Promise<void> => {
  /* 
  1. User exist check
  2. Checking password is matched
  3. Hash password before saving
  4. Update password 
  */

  const { newPassword, oldPassword } = passwordData;

  // 1. User exist check
  // const isUserExist = await User.userExists(user?.userId);
  // if (!isUserExist) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  // }
  // 1.  Alternative
  const isUserExist = await User.findOne({ id: user?.userId }).select(
    '+password'
  );
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }

  // 2. Checking password is matched
  const isPasswordMatched = await User.isPasswordMatched(
    oldPassword,
    isUserExist?.password as string
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old password is incorrect');
  }

  // 3. Hash password before saving
  // const passwordHashed = await bcrypt.hash(
  //   newPassword,
  //   Number(config.bycrypt_saltrounds)
  // );

  // // 4. Update password
  // const udpateData = {
  //   password: passwordHashed,
  //   needsPasswordChange: false,
  //   changePasswordAt: new Date(),
  // };

  // 5. Update database
  // await User.findOneAndUpdate({ id: user?.userId }, udpateData);

  // update data
  (isUserExist as IUser).needsPasswordChange = false;
  (isUserExist as IUser).password = newPassword;
  isUserExist?.save();
};
export const AuthService = { authLogin, refreshToken, changePassword };
