import { Router } from 'express';
import { departmentController } from './detpartment.controller';
import zodValidateRequest from '../../middlewires/zodValidateRequest';
import { departmentZodSchema } from './detpartment.zod.validation';

const router = Router();

router.get(
  '/create-department',
  zodValidateRequest(departmentZodSchema.createDepartment),
  departmentController.createDepartment
);

router.get('/:id', departmentController.getSingleDepartment);
router.patch(
  '/:id',
  zodValidateRequest(departmentZodSchema.updateDepartment),
  departmentController.updateDepartment
);
router.delete('/:id', departmentController.deleteDepartment);
router.get('/', departmentController.getAllDepartments);

export const departmentRouter = router;
