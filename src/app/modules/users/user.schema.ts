import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { studentModel } from '../student/student.model';
import { adminModel } from '../admin/admin.model';
import { facultyUserModel } from '../FacultyUser/facultyUser.model';

const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: studentModel,
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: facultyUserModel,
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: adminModel,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const User = model<IUser, UserModel>('User', userSchema);
