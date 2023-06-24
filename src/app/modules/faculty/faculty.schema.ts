import { Schema, model } from 'mongoose';
import { IFaculty, IFacultyModel } from './faculty.interface';

const facultSchema = new Schema<IFaculty>(
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
const FacultyModel = model<IFaculty, IFacultyModel>('Faculty', facultSchema);

export default FacultyModel;
