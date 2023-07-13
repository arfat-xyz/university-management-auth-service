import express from 'express';
import zodValidateRequest from '../../middlewires/zodValidateRequest';
import { FacultyUsersController } from './facultyUser.controller';
import { FacultyUsersZodSchema } from './facultyUser.zod.validation';
import { auth } from '../../middlewires/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  FacultyUsersController.getSingleFacultyUsers
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  FacultyUsersController.deleteFacultyUsers
);
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  FacultyUsersController.getAllFacultyUsers
);
router.patch(
  '/:id',
  zodValidateRequest(FacultyUsersZodSchema.updateFacultyUsers),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  FacultyUsersController.updateFacultyUsers
);

export const FacultyUsers = router;
