import express from 'express';
import zodValidateRequest from '../../middlewires/zodValidateRequest';
import { FacultyUsersController } from './facultyUser.controller';
import { FacultyUsersZodSchema } from './facultyUser.zod.validation';

const router = express.Router();

router.get('/:id', FacultyUsersController.getSingleFacultyUsers);
router.delete('/:id', FacultyUsersController.deleteFacultyUsers);
router.get('/', FacultyUsersController.getAllFacultyUsers);
router.patch(
  '/:id',
  zodValidateRequest(FacultyUsersZodSchema.updateFacultyUsers),
  FacultyUsersController.updateFacultyUsers
);

export const FacultyUsers = router;
