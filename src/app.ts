import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewires/globalErrorHandler';
import routers from './app/routes';
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

// Global error handler
app.use(globalErrorHandler);

export default app;
