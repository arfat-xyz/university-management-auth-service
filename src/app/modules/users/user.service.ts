import config from '../../../config'
import ApiError from '../../../errors/ApiErrors'
import { IUser } from './user.interface'
import { User } from './user.schema'
import { generateUserId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto incremental userID
  const id = await generateUserId()
  user.id = id
  // set default password
  if (!user.password) {
    user.password = config.university_default_password as string
  }

  const createdUser = await User.create(user)
  if (!createUser) {
    throw new ApiError(400, 'User not created')
  }
  return createdUser
}

export const UserService = {
  createUser,
}
