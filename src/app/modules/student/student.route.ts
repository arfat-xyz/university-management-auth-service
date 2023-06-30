import express from 'express';
import { StudentController } from './student.controller';
import zodValidateRequest from '../../middlewires/zodValidateRequest';
import { StudentZodValidation } from './student.zod.validation';

const router = express.Router();

router.get('/:id', StudentController.getSingleStudent);
router.delete('/:id', StudentController.deleteStudent);
router.get('/', StudentController.getAllStudents);
router.patch(
  '/:id',
  zodValidateRequest(StudentZodValidation.updateStudentZodSchema),
  StudentController.updateStudent
);

export const StudentsRoutes = router;
