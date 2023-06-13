import express from 'express';
import zodValidateRequest from '../../middlewires/zodValidateRequest';
import { academicSemisterZodValidation } from './academicSemister.zod.valitation';

const router = express.Router();

router.post(
  '/create-user',
  zodValidateRequest(academicSemisterZodValidation.academicSemisterZodSchema)
  //   UserController.createUser
);

export const UserRouter = router;
