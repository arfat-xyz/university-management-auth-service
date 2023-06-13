import { Schema, model } from 'mongoose';
import {
  IAcademcSemisterInterface,
  IAcademcSemisterModel,
} from './academicSemister.interface';
import {
  academicSemisterCode,
  academicSemisterMonths,
  academicSemisterTitle,
} from './academicSemister.constant';

const academicSemisterSchema = new Schema<IAcademcSemisterInterface>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemisterTitle,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: academicSemisterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: academicSemisterMonths,
    },
    endMonth: {
      type: String,
      required: true,
      enum: academicSemisterMonths,
    },
  },
  {
    timestamps: true,
  }
);
export const academicSemister = model<
  IAcademcSemisterInterface,
  IAcademcSemisterModel
>('academicSemister', academicSemisterSchema);
