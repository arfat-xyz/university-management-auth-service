import { Model, Types } from 'mongoose';
import { IAcademicFaculty } from '../faculty/faculty.interface';

export type IAcademicDepartment = {
  title: string;
  academicFaculty: Types.ObjectId | IAcademicFaculty;
};

export type IAcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;

export type IAcademicDepartmentFilterRequest = {
  searchTerm?: string;
};
