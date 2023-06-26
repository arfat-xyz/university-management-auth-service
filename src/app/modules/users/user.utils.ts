import { IAcademcSemisterInterface } from '../academicSemister/academicSemister.interface';
import { User } from './user.schema';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne({ rle: 'Student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id.substring(4) : undefined;
};
export const generateStudentId = async (
  academicSemister: IAcademcSemisterInterface
) => {
  const lastId = (await findLastStudentId()) || (0).toString().padStart(5, '0');

  let incrementId = (parseInt(lastId) + 1).toString().padStart(5, '0');
  incrementId =
    academicSemister.year.substring(2, 4) + academicSemister.code + incrementId;
  return incrementId;
};

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne({ role: 'Faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastFaculty?.id ? lastFaculty?.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
  const lastId = (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  const incrementId = 'F-' + lastId;
  console.log(incrementId);
  return incrementId;
};
