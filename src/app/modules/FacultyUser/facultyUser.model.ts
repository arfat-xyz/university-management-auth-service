import { Schema, model } from 'mongoose';
import { bloodGroupContant, genderConstant } from '../student/student.constant';
import { IFacultyUser, IFacultyUserModel } from './facultyUser.interface';
import { AcademicDepartmentModel } from '../department/detpartment.model';
import AcademicFacultyModel from '../faculty/faculty.schema';

export const FacultyUserSchema = new Schema<IFacultyUser, IFacultyUserModel>(
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
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: AcademicFacultyModel,
    },
    designation: {
      type: String,
      required: true,
      enum: ['Professor', 'Lecturer'],
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: AcademicDepartmentModel,
    },
    bloodGroup: {
      type: String,
      required: true,
      enum: bloodGroupContant,
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    presentAddress: {
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

export const facultyUserModel = model<IFacultyUser, IFacultyUserModel>(
  'Faculty',
  FacultyUserSchema
);
