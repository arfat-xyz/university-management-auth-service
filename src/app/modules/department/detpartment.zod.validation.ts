import { z } from 'zod';

const createDepartment = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    academicFaculty: z.string({
      required_error: 'academic Faculty is required',
    }),
  }),
});
const updateDepartment = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: 'academic Faculty is required',
      })
      .optional(),
  }),
});
export const departmentZodSchema = { createDepartment, updateDepartment };
