import { z } from 'zod';
import {
  academicSemisterCode,
  academicSemisterMonths,
  academicSemisterTitle,
} from './academicSemister.constant';
const createAcademicSemisterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemisterTitle] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.string({
      required_error: 'Year is required',
    }),
    code: z.enum([...academicSemisterCode] as [string, ...string[]], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum([...academicSemisterMonths] as [string, ...string[]], {
      required_error: 'Start month is required',
    }),
    endMonth: z.enum([...academicSemisterMonths] as [string, ...string[]], {
      required_error: 'End month is required',
    }),
  }),
});
const updateAcademicSemisterZodSchema = z
  .object({
    body: z.object({
      title: z
        .enum([...academicSemisterTitle] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is required',
        })
        .optional(),
      code: z
        .enum([...academicSemisterCode] as [string, ...string[]], {
          required_error: 'Code is required',
        })
        .optional(),
      startMonth: z
        .enum([...academicSemisterMonths] as [string, ...string[]], {
          required_error: 'Start month is required',
        })
        .optional(),
      endMonth: z
        .enum([...academicSemisterMonths] as [string, ...string[]], {
          required_error: 'End month is required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either both title and code should be provided or neither',
    }
  );

export const academicSemisterZodValidation = {
  createAcademicSemisterZodSchema,
  updateAcademicSemisterZodSchema,
};
