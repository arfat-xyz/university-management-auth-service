import { Schema, model } from 'mongoose';
import { IAcademicFaculty, IFacultyModel } from './faculty.interface';

const facultSchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
const AcademicFacultyModel = model<IAcademicFaculty, IFacultyModel>(
  'AcademicFaculty',
  facultSchema
);

export default AcademicFacultyModel;
