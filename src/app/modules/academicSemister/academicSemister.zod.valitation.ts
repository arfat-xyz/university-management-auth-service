import { z } from 'zod';
import {
  academicSemisterCode,
  academicSemisterMonths,
  academicSemisterTitle,
} from './academicSemister.constant';
const academicSemisterZodSchema = z.object({
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

const updateAcademicSemisterZodSchema = z.object({
  body: z.object({
    title: z
      .enum([...academicSemisterTitle] as [string, ...string[]])
      .optional(),
    year: z.string().optional(),
    code: z.enum([...academicSemisterCode] as [string, ...string[]]).optional(),
    startMonth: z
      .enum([...academicSemisterMonths] as [string, ...string[]])
      .optional(),
    endMonth: z
      .enum([...academicSemisterMonths] as [string, ...string[]])
      .optional(),
  }),
});

export const academicSemisterZodValidation = {
  academicSemisterZodSchema,
  updateAcademicSemisterZodSchema,
};
