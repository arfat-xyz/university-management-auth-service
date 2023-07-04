import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { studentModel } from '../student/student.model';
import { adminModel } from '../admin/admin.model';
import { facultyUserModel } from '../FacultyUser/facultyUser.model';
import bcrypt from 'bcrypt';
import config from '../../../config';

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

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_saltrounds)
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
