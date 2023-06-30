import { z } from 'zod';
import { genderConstant } from '../student/student.constant';

const updateFacultyUsers = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    gender: z.enum([...genderConstant] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    email: z.string().email().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    bloodGroup: z.string().optional(),
    academicDepartment: z.string().optional(),
    academicFaculty: z.string().optional(),
    designation: z.string().optional(),
  }),
});

export const FacultyUsersZodSchema = { updateFacultyUsers };
