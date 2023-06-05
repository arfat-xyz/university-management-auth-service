import { config } from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import { IGenericErrorMessage } from '../../interfaces/errors'
import handleValidateError from '../../errors/handleValidateError'
import mongoose from 'mongoose'
import { error } from 'winston'
import ApiError from '../../errors/ApiErrors'

// global error handling
const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //   res.status(400).json({ error: err })

  let statusCode: string | number = 500
  let message = 'Something went wrong'
  let errorsMessages: IGenericErrorMessage[] = []

  if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidateError(
      err as mongoose.Error.ValidationError
    )
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorsMessages = simplifiedError.errorsMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error.message
    errorsMessages = error?.message
      ? [{ path: '', message: error.message }]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorsMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorsMessages,
    stack: config.env !== 'production' ? err.stack : undefined,
  })

  next()
}
export default globalErrorHandler
