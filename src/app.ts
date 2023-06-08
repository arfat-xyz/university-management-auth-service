import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/user.route'
import globalErrorHandler from './app/middlewires/globalErrorHandler'
const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes
app.use('/api/v1/users/', userRouter)

// api error handling class

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  // res.send('Hello World!')
  // throw new ApiError(400, 'Bhail')
  // throw new Error('Bodda matha tik ase ne')
  next('Matha tik ase?')
})

// Global error handler
app.use(globalErrorHandler)

export default app
