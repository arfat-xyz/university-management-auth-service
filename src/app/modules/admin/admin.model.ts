import { Schema, model } from 'mongoose';
import { IAdmin, IAdminModel } from './admin.interface';
import { genderConstant } from '../student/student.constant';

export const AdminSchema = new Schema<IAdmin, IAdminModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      middleName: {
        type: String,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    gender: {
      type: String,
      enum: genderConstant,
    },
    dateOfBirth: {
      type: String,
    },
    emergencyContactNo: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    profileImage: {
      type: String,
      // required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    contactNo: {
      type: String,
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

export const adminModel = model<IAdmin, IAdminModel>('admin', AdminSchema);
