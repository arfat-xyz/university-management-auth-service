import { Model } from 'mongoose';
export type IAcademicSemiserMonth =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type IAcademicSemiserTitle = 'Autumn' | 'Summer' | 'Fall';
export type IAcademicSemisterCode = '01' | '02' | '03';
export type IAcademcSemisterInterface = {
  title: IAcademicSemiserTitle;
  year: number;
  code: IAcademicSemisterCode;
  startMonth: IAcademicSemiserMonth;
  endMonth: IAcademicSemiserMonth;
};
export type IAcademcSemisterModel = Model<IAcademcSemisterInterface>;
export type IAcademicSemisterFilters = {
  searchTerm: string;
};
