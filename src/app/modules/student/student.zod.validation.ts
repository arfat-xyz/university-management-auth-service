import { z } from 'zod';
import { bloodGroupContant, genderConstant } from './student.constant';

const updateStudentZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string().optional(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
    }),
    gender: z.enum([...genderConstant] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    email: z.string().email().optional(),
    presentAddress: z.string().optional(),
    permanentAddress: z.string().optional(),
    bloodGroup: z
      .enum([...bloodGroupContant] as [string, ...string[]])
      .optional(),
    guardian: z
      .object({
        fatherName: z.string().optional(),
        fatherOccopation: z.string().optional(),
        fatherContactNo: z.string().optional(),
        motherName: z.string().optional(),
        motherOccopation: z.string().optional(),
        motherContactNo: z.string().optional(),
        address: z.string().optional(),
      })
      .optional(),
    localGuardian: z
      .object({
        name: z.string().optional(),
        occopation: z.string().optional(),
        contactNo: z.string().optional(),
        address: z.string().optional(),
      })
      .optional(),
    profileImage: z.string().optional(),
    academicSemister: z.string().optional(),
    academicDepartment: z.string().optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const StudentZodValidation = { updateStudentZodSchema };
