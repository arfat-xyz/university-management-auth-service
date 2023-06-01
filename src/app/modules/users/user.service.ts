import config from '../../../config'
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
    throw new Error('User not created')
  }
  return createdUser
}

export default {
  createUser,
}
