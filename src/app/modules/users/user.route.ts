import express from 'express';
import { UserController } from './user.controller';
import { UserZodValidation } from './user.zod.validation';
import zodValidateRequest from '../../middlewires/zodValidateRequest';

const router = express.Router();

router.post(
  '/create-user',
  zodValidateRequest(UserZodValidation.createUserZodSchema),
  UserController.createUser
);

export const UserRouter = router;
