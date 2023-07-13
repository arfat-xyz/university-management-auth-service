import { Router } from 'express';
import zodValidateRequest from '../../middlewires/zodValidateRequest';
import { AuthZodSchema } from './auth.zod.validation';
import { AuthController } from './auth.controller';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { auth } from '../../middlewires/auth';

const router = Router();

router.post(
  '/login',
  zodValidateRequest(AuthZodSchema.authLogin),
  AuthController.authLogin
);
router.post(
  '/refresh-token',
  zodValidateRequest(AuthZodSchema.refreshToken),
  AuthController.refreshToken
);
router.post(
  '/change-password',
  zodValidateRequest(AuthZodSchema.changePassword),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  AuthController.changePassword
);
export const AuthRoutes = router;
