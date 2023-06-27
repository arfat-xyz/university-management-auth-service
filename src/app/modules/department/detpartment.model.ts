import { Schema, model } from 'mongoose';
import {
  IAcademicDepartment,
  IAcademicDepartmentModel,
} from './detpartment.interface';
import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';

const AcademicDepartmentSchema = new Schema<
  IAcademicDepartment,
  IAcademicDepartmentModel
>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

AcademicDepartmentSchema.pre('save', async function (next) {
  const exist = await AcademicDepartmentModel.findOne({
    title: this.title,
    academicFaculty: this.academicFaculty,
  });
  if (exist) {
    throw new ApiError(httpStatus.CONFLICT, 'Department already exists');
  }
  next();
});

export const AcademicDepartmentModel = model<
  IAcademicDepartment,
  IAcademicDepartmentModel
>('AcademicDepartment', AcademicDepartmentSchema);
