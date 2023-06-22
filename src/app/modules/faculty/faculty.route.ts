import express from 'express';
import { facultyController } from './faculty.controller';
import { facultyZodValidation } from './faculty.zod.validation';
import zodValidateRequest from '../../middlewires/zodValidateRequest';
const router = express.Router();

router.post(
  '/create-faculty',
  zodValidateRequest(facultyZodValidation.validateTitle),
  facultyController.createFaculty
);
router.get('/:id', facultyController.getSingleFaculty);
router.patch(
  '/:id',
  zodValidateRequest(facultyZodValidation.validateTitle),
  facultyController.updateFaculty
);
router.delete('/:id', facultyController.deleteFaculty);
// router.get('/', facultyController.getAllFaculty);
export const FacultyRoutes = router;
