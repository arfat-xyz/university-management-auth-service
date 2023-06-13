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
    year: z.number({
      required_error: 'Year is required',
    }),
    code: z.enum([...academicSemisterCode] as [string, ...string[]], {
      required_error: 'Code is required',
    }),
    startMonth: z.enum([...academicSemisterMonths] as [string, ...string[]], {
      required_error: 'Start month is required',
    }),
    endMonth: z.enum([...academicSemisterMonths] as [string, ...string[]], {
      required_error: 'Start month is required',
    }),
  }),
});

export const academicSemisterZodValidation = {
  academicSemisterZodSchema,
};
