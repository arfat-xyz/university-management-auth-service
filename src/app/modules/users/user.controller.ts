import { RequestHandler } from 'express'
import { UserService } from './user.service'
import { Logger } from '../../../Shared/logger'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await UserService.createUser(user)

    res.status(200).json({
      success: true,
      message: `User created successfully.`,
      data: result,
    })
  } catch (error) {
    Logger.errorLogger.error('Failed to create user : ', error)
    // res.status(400).json({
    //   success: false,
    //   message: 'Failded to create new user',
    // })
    next(error)
  }
}

export const UserController = { createUser }
