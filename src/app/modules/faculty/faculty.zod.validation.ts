import { z } from 'zod';

const createFaculty = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});
const updateFaculty = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
  }),
});
export const facultyZodSchema = { createFaculty, updateFaculty };
