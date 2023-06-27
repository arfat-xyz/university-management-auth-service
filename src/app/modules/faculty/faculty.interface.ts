import { Model } from 'mongoose';

export type IAcademicFaculty = {
  title: string;
};
export type IFilterableFields = {
  searchTerm: string;
  title: string;
};

export type IFacultyModel = Model<IAcademicFaculty>;
