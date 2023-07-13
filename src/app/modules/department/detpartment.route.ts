import { Router } from 'express';
import { departmentController } from './detpartment.controller';
import zodValidateRequest from '../../middlewires/zodValidateRequest';
import { departmentZodSchema } from './detpartment.zod.validation';
import { auth } from '../../middlewires/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = Router();

router.post(
  '/create-department',
  zodValidateRequest(departmentZodSchema.createDepartment),
  departmentController.createDepartment
);

router.get('/:id', departmentController.getSingleDepartment);
router.patch(
  '/:id',
  zodValidateRequest(departmentZodSchema.updateDepartment),

  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  departmentController.updateDepartment
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.SUPER_ADMIN),
  departmentController.deleteDepartment
);
router.get('/', departmentController.getAllDepartments);

export const departmentRouter = router;
