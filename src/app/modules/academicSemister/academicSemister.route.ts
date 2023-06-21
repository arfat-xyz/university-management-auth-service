import express from 'express';
import zodValidateRequest from '../../middlewires/zodValidateRequest';
import { academicSemisterZodValidation } from './academicSemister.zod.valitation';
import { AcademicSemisterController } from './academicSemister.controller';

const router = express.Router();

router.post(
  '/create-semister',
  zodValidateRequest(
    academicSemisterZodValidation.createAcademicSemisterZodSchema
  ),
  AcademicSemisterController.createSemisterController
);
router.get('/:id', AcademicSemisterController.getSingleSemisterController);
router.patch(
  '/:id',
  zodValidateRequest(
    academicSemisterZodValidation.updateAcademicSemisterZodSchema
  ),
  AcademicSemisterController.updateSemister
);
router.delete(
  '/:id',

  AcademicSemisterController.deleteSemister
);
router.get('/', AcademicSemisterController.getAllSemisters);

export const AcademicSemisterRoutes = router;
