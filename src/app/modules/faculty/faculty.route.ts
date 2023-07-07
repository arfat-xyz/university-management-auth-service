import { Router } from 'express';
import { facultyController } from './faculty.controller';
import zodValidateRequest from '../../middlewires/zodValidateRequest';
import { facultyZodSchema } from './faculty.zod.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { auth } from '../../middlewires/auth';

const router = Router();

router.post(
  '/create-faculty',
  zodValidateRequest(facultyZodSchema.createFaculty),

  auth(ENUM_USER_ROLE.ADMIN),
  facultyController.createFaculty
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  facultyController.getSingleFaculty
);
router.patch(
  '/: id',
  zodValidateRequest(facultyZodSchema.updateFaculty),
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY
  ),
  facultyController.updateFaculty
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  facultyController.deleteFaculty
);
router.get(
  '/',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  facultyController.getAllFaculty
);

export const facultyRoutes = router;
