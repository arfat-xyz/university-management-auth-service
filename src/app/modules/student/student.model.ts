import { Schema, model } from 'mongoose';
import { IStudent, IStudentModel } from './student.interface';
import { bloodGroupContant, genderConstant } from './student.constant';
import { AcademicSemister } from '../academicSemister/academicSemister.schema';
import { AcademicDepartmentModel } from '../department/detpartment.model';
import AcademicFacultyModel from '../faculty/faculty.schema';

export const StudentSchema = new Schema<IStudent, IStudentModel>(
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
    },
    contactNo: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      // required: true,
      enum: bloodGroupContant,
    },
    guardian: {
      required: true,
      type: {
        fatherName: {
          type: String,
          required: true,
        },
        fatherOccopation: {
          type: String,
          required: true,
        },
        fatherContactNo: {
          type: String,
          required: true,
        },
        motherName: {
          type: String,
          required: true,
        },
        motherOccopation: {
          type: String,
          required: true,
        },
        motherContactNo: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
    },
    localGuardian: {
      required: true,
      type: {
        name: {
          type: String,
          required: true,
        },
        occopation: {
          type: String,
          required: true,
        },
        contactNo: {
          type: String,
          required: true,
        },
        address: {
          type: String,
          required: true,
        },
      },
    },
    academicSemister: {
      type: Schema.Types.ObjectId,
      ref: AcademicSemister,
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: AcademicDepartmentModel,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: AcademicFacultyModel,
    },
    profileImage: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const studentModel = model<IStudent, IStudentModel>(
  'student',
  StudentSchema
);
