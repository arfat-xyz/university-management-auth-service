import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewires/globalErrorHandler';
import routers from './app/routes';
import httpStatus from 'http-status';
// import { generateUserId } from './app/modules/users/user.utils';
const app: Application = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// application routes
app.use('/api/v1', routers);

// api error handling class

// Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   // res.send('Hello World!')
// //   throw new ApiError(400, 'Bhail')
// // Promise.reject(new Error("Unhandeled error"))
// //   throw new Error('Bodda matha tik ase ne')
//   // next('Matha tik ase.......?')
// })

// Testing Student User
// const test = async () => {
//   const user = await generateUserId({ year: '2025', code: '01' });
// };
// test();

// Global error handler
app.use(globalErrorHandler);

// Handle Route not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });
  next();
});

export default app;
