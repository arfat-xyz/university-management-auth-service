import express from 'express';
import zodValidateRequest from '../../middlewires/zodValidateRequest';
import { academicSemisterZodValidation } from './academicSemister.zod.valitation';
import { AcademicSemisterController } from './academicSemister.controller';
import { auth } from '../../middlewires/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post(
  '/create-semister',
  zodValidateRequest(academicSemisterZodValidation.academicSemisterZodSchema),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicSemisterController.createSemisterController
);
router.get(
  '/:id',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  AcademicSemisterController.getSingleSemisterController
);
router.patch(
  '/:id',
  zodValidateRequest(
    academicSemisterZodValidation.updateAcademicSemisterZodSchema
  ),
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicSemisterController.updateSemister
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  AcademicSemisterController.deleteSemister
);
router.get(
  '/',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  AcademicSemisterController.getAllSemisters
);

export const AcademicSemisterRoutes = router;
