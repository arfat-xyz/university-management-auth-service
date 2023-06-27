import { Model, Types } from 'mongoose';
import { IGender } from '../../../constants/user';

export type IAdmin = {
  id: string;
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  gender: IGender;
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  email: string;
  department: Types.ObjectId;
  designation: string;
  profileImage: string;
};
export type IAdminModel = Model<IAdmin, Record<string, unknown>>;
