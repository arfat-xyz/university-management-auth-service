import {
  IAcademicSemiserMonth,
  IAcademicSemiserTitle,
  IAcademicSemisterCode,
} from './academicSemister.interface';

export const academicSemisterTitle: IAcademicSemiserTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academicSemisterCode: IAcademicSemisterCode[] = ['01', '02', '03'];
export const academicSemisterMonths: IAcademicSemiserMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemisterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};
export const academicSemiserSearchableFields = [
  'searchTerm',
  'year',
  'title',
  'code',
];
export const academicSemisterFilterableFields = ['title', 'code', 'year'];
