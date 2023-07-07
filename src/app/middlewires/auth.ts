import { NextFunction, Request, Response } from 'express';
import { JWTHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../errors/ApiErrors';
import httpStatus from 'http-status';

export const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      // verify token
      let verifiedUser = null;
      verifiedUser = JWTHelpers.verifyToken(
        token as string,
        config.jwt.jwt_secret as Secret
      );
      req.user = verifiedUser;
      // console.log(
      //   requiredRoles,
      //   token,
      //   verifiedUser,
      //   requiredRoles.includes(req.user.role)
      // );
      if (requiredRoles.length > 0 && !requiredRoles.includes(req.user.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized');
      }
      next();
    } catch (error) {
      next(error);
    }
  };
