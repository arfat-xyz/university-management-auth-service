import { Schema, model } from 'mongoose';
import { IFaculty } from './faculty.interface';
import ApiError from '../../../errors/ApiErrors';
import httpStatus from 'http-status';

const facultySchema = new Schema<IFaculty>(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

facultySchema.pre('save', async function (next) {
  const exist = await FacultyModel.findOne({ title: this.title });
  if (exist) {
    throw new ApiError(httpStatus.CONFLICT, 'This faculty already exists');
  }
  next();
});

export const FacultyModel = model('Faculty', facultySchema);
