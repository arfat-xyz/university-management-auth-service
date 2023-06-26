import config from '../../../config';
import ApiError from '../../../errors/ApiErrors';
import { IUser } from './user.interface';
import { User } from './user.schema';
import { generateFacultyId } from './user.utils';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto incremental userID
  // const academicSemister = {
  //   code: '02',
  //   year: '2025',
  // };
  const id = await generateFacultyId();
  user.id = id;
  // set default password
  if (!user.password) {
    user.password = config.university_default_password as string;
  }
  const createdUser = await User.create(user);
  if (!createUser) {
    throw new ApiError(400, 'User not created');
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
