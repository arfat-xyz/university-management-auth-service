import { Model, Types } from 'mongoose';
import { IStudent } from '../student/student.interface';
import { IFacultyUser } from '../FacultyUser/facultyUser.interface';
import { IAdmin } from '../admin/admin.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFacultyUser;
  admin?: Types.ObjectId | IAdmin;
};
// IAdmin, IFaculty
export type UserModel = Model<IUser, Record<string, unknown>>;
