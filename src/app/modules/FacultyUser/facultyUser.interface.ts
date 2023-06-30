import { Model, Types } from 'mongoose';
import { IGender } from '../../../constants/user';
import { IBloodGroup } from '../student/student.interface';

export type IDesignation = 'Professor' | 'Lecturer';
export type IFacultyUser = {
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
  presentAddress: string;
  permanentAddress: string;
  bloodGroup: IBloodGroup;
  designation: IDesignation;
  academicDepartment: Types.ObjectId;
  academicFaculty: Types.ObjectId;
  profileImage: string;
};
export type IFacultyUserModel = Model<IFacultyUser, Record<string, unknown>>;

export type IFacultyUsersFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
  academicFaculty?: string;
  designation?: string;
};
