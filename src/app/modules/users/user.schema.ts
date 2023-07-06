import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { studentModel } from '../student/student.model';
import { adminModel } from '../admin/admin.model';
import { facultyUserModel } from '../FacultyUser/facultyUser.model';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser, UserModel>(
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
    needsPasswordChange: {
      type: Boolean,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
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

userSchema.statics.userExists = async function (
  id: string
): Promise<Pick<
  IUser,
  'id' | 'password' | 'role' | 'needsPasswordChange'
> | null> {
  return await User.findOne(
    { id },
    { id: 1, password: 1, needsPasswordChange: 1 }
  ).lean();
};
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassord: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassord);
};

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_saltrounds)
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
