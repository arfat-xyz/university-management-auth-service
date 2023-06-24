import { Model } from 'mongoose';

export type IFaculty = {
  title: string;
};
export type IFilterableFields = {
  searchTerm: string;
  title: string;
};

export type IFacultyModel = Model<IFaculty>;
