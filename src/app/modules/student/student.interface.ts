import { Model, Types } from 'mongoose';
import { IAcademcSemisterInterface } from '../academicSemister/academicSemister.interface';
import { IAcademicDepartment } from '../department/detpartment.interface';
import { IAcademicFaculty } from '../faculty/faculty.interface';

export type IBloodGroup =
  | 'O+'
  | 'O-'
  | 'A+'
  | 'A-'
  | 'B+'
  | 'B-'
  | 'AB+'
  | 'AB-';
export type IGender = 'male' | 'female';
export type IStudentGuardian = {
  fatherName: string;
  fatherOccopation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccopation: string;
  motherContactNo: string;
  address: string;
};
export type IStudentLocalGuardian = {
  name: string;
  occopation: string;
  contactNo: string;
  address: string;
};
export type IStudent = {
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
  bloodGroup?: IBloodGroup;
  guardian: IStudentGuardian;
  localGuardian: IStudentLocalGuardian;
  profileImage?: string;
  academicSemister: Types.ObjectId | IAcademcSemisterInterface;
  academicDepartment: Types.ObjectId | IAcademicDepartment;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};
export type IStudentModel = Model<IStudent, Record<string, unknown>>;
export type IStudentFilters = {
  searchTerm?: string;
  id?: string;
  email?: string;
  contactNo?: string;
  emergencyContactNo?: string;
};
