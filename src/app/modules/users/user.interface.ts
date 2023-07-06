/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFacultyUser } from '../FacultyUser/facultyUser.interface';
import { IAdmin } from '../admin/admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  needsPasswordChange: boolean;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFacultyUser;
  admin?: Types.ObjectId | IAdmin;
};

// userExists isPasswordMatched using METHODS
// export type IUserMethods = {
//   userExists(id: string): Promise<Partial<IUser | null>>;
//   isPasswordMatched(
//     givenPassword: string,
//     savedPassord: string
//   ): Promise<boolean>;
// };

//userExists isPasswordMatched using STATICS
export type UserModel = {
  userExists(
    id: string
  ): Promise<Pick<
    IUser,
    'id' | 'password' | 'role' | 'needsPasswordChange'
  > | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassord: string
  ): Promise<boolean>;
} & Model<IUser>;

// IAdmin, IFaculty
