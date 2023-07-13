import express from 'express';
import { UserController } from './user.controller';
import { UserZodValidation } from './user.zod.validation';
import zodValidateRequest from '../../middlewires/zodValidateRequest';
import { auth } from '../../middlewires/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-student',
  zodValidateRequest(UserZodValidation.createStudentZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createStudent
);
router.post(
  '/create-admin',
  zodValidateRequest(UserZodValidation.createAdminZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createAdmin
);
router.post(
  '/create-faculty',
  zodValidateRequest(UserZodValidation.createFacultyZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createFaculty
);

export const UserRouter = router;
