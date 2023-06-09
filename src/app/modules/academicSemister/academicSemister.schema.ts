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
import ApiError from '../../../errors/ApiErrors';
import status from 'http-status';

const academicSemisterSchema = new Schema<IAcademcSemisterInterface>(
  {
    title: {
      type: String,
      required: true,
      enum: academicSemisterTitle,
    },
    year: {
      type: String,
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
    toJSON: {
      virtuals: true,
    },
  }
);

// Handling Same year same semister issue
academicSemisterSchema.pre('save', async function (next) {
  const exist = await AcademicSemister.findOne({
    title: this.title,
    year: this.year,
  });

  if (exist) {
    throw new ApiError(status.CONFLICT, 'Academic semister already exist !');
  }
  next();
});

export const AcademicSemister = model<
  IAcademcSemisterInterface,
  IAcademcSemisterModel
>('academicSemister', academicSemisterSchema);
