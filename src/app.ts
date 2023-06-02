import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/user.route'
const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// application routes
app.use('/api/v1/users/', userRouter)

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
