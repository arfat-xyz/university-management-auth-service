import { ErrorRequestHandler } from 'express'
import { IGenericErrorMessage } from '../../interfaces/errors'
import handleValidateError from '../../errors/handleValidateError'
import mongoose from 'mongoose'
import ApiError from '../../errors/ApiErrors'
import config from '../../config'
// import { Logger } from '../../Shared/logger'

// global error handling
const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  //   res.status(400).json({ error: err })

  // config.env === 'development' ? console.log("😀 GlobalErrorHandler", error) :
  // Logger.errorLogger.error("😀 GlobalErrorHandler", error)
  let statusCode: string | number = 500
  let message = 'Something went wrong'
  let errorsMessages: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidateError(
      error as mongoose.Error.ValidationError
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
    stack: config.env !== 'production' ? error.stack : undefined,
  })

  next()
}
export default globalErrorHandler
