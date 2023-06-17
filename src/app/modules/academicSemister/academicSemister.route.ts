import express from 'express';
import zodValidateRequest from '../../middlewires/zodValidateRequest';
import { academicSemisterZodValidation } from './academicSemister.zod.valitation';
import { AcademicSemisterController } from './academicSemister.controller';

const router = express.Router();

router.post(
  '/create-semister',
  zodValidateRequest(academicSemisterZodValidation.academicSemisterZodSchema),
  AcademicSemisterController.createSemisterController
);
router.get('/', AcademicSemisterController.getAllSemisters);

export const AcademicSemisterRoutes = router;
