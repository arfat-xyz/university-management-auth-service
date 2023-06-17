export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: 'title' | 'year' | 'code' | 'startMonth' | 'endMonth' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
};
