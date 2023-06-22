import { IFaculty } from './faculty.interface';
import { FacultyModel } from './faculty.schema';

const createFaculty = async (title: string): Promise<IFaculty> => {
  const result = await FacultyModel.create({ title });
  console.log('service', result);
  return result;
};

// const getAllFaculty = async (
//   filters: IFaculty,
//   paginationOptions: IPaginationOptions
// ): Promise<IFaculty[]> => {
//   const { page, limit, skip, sortBy, sortOrder } =
//     paginationHelpers.calculatePagination(paginationOptions);
//   const { searchTerm, ...filterFields } = filters;
//   const sortCondition: { [key: string]: SortOrder } = {};

//   if (sortBy && sortOrder) {
//     sortCondition[sortBy] = sortOrder;
//   }

//   const andCondition = [];
//   if (searchTerm) {
//     andCondition.push({
//       $or: ['title'].map(field => ({
//         [field]: {
//           $regex: searchTerm,
//           $options: 'i',
//         },
//       })),
//     });
//   }

//   if (Object.keys(filtersFields).length) {
//     andCondition.push({
//       $and: Object.entries(filtersFields).map(([field, value]) => ({
//         [field]: value,
//       })),
//     });
//   }
//   const result = await FacultyModel.find(filters);
//   return result;
// };
const getSingleFaculty = async (id: string) => {
  const result = await FacultyModel.findById(id);
  return result;
};
const updateFaculty = async (
  id: string,
  payload: IFaculty
): Promise<IFaculty | null> => {
  const result = await FacultyModel.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};
const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await FacultyModel.findByIdAndDelete({ _id: id });
  return result;
};

export const facultyService = {
  createFaculty,
  // getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
