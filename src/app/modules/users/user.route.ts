import express from 'express';
import { UserController } from './user.controller';
import { UserZodValidation } from './user.zod.validation';
import zodValidateRequest from '../../middlewires/zodValidateRequest';

const router = express.Router();

router.post(
  '/create-student',
  zodValidateRequest(UserZodValidation.createStudentZodSchema),
  UserController.createStudent
);
router.post(
  '/create-admin',
  zodValidateRequest(UserZodValidation.createAdminZodSchema),
  UserController.createAdmin
);
router.post(
  '/create-faculty',
  zodValidateRequest(UserZodValidation.createFacultyZodSchema),
  UserController.createFaculty
);

export const UserRouter = router;
