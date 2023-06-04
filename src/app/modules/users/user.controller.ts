import { Request, Response } from 'express'
import userService from './user.service'
import { errorlogger } from '../../../shared/logger'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await userService.createUser(user)

    res.status(200).json({
      success: true,
      message: `User created successfully.`,
      data: result,
    })
  } catch (error) {
    errorlogger.error('Failed to create user : ', error)
    res.status(400).json({
      success: false,
      message: 'Failded to create new user',
    })
  }
}

export default { createUser }
