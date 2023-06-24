import { Router } from 'express';
import { facultyController } from './faculty.controller';
import zodValidateRequest from '../../middlewires/zodValidateRequest';
import { facultyZodSchema } from './faculty.zod.validation';

const router = Router();

router.post(
  '/create-faculty',
  zodValidateRequest(facultyZodSchema.createFaculty),
  facultyController.createFaculty
);
router.get('/:id', facultyController.getSingleFaculty);
router.patch(
  '/: id',
  zodValidateRequest(facultyZodSchema.createFaculty),
  facultyController.updateFaculty
);
router.delete('/:id', facultyController.deleteFaculty);
router.get('/', facultyController.getAllFaculty);

export const facultyRoutes = router;
