import { Router } from 'express';
import zodValidateRequest from '../../middlewires/zodValidateRequest';
import { AuthZodSchema } from './auth.zod.validation';
import { AuthController } from './auth.controller';

const router = Router();

router.post(
  '/login',
  zodValidateRequest(AuthZodSchema.authLogin),
  AuthController.authLogin
);

// router.get('/:id', departmentController.getSingleDepartment);
// router.patch(
//   '/:id',
//   zodValidateRequest(departmentZodSchema.updateDepartment),
//   departmentController.updateDepartment
// );
// router.delete('/:id', departmentController.deleteDepartment);
// router.get('/', departmentController.getAllDepartments);

export const AuthRoutes = router;
