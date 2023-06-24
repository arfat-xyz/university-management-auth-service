import { Model, Types } from 'mongoose';
import { IFaculty } from '../faculty/faculty.interface';

export type IAcademicDepartment = {
  title: string;
  academicFaculty: Types.ObjectId | IFaculty;
};

export type IAcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;

export type IAcademicDepartmentFilterRequest = {
  searchTerm?: string;
};
