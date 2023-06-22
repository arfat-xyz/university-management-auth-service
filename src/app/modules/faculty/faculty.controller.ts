import { Request, Response } from 'express';
import catchAsync from '../../../Shared/catchAsync';
import { facultyService } from './faculty.service';
import sendResponse from '../../../Shared/sendResponse';
import { IFaculty } from './faculty.interface';
import httpStatus from 'http-status';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await facultyService.createFaculty(req.body.title);
  console.log('controller', result);
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,

    success: true,
    message: `Faculty created successfully.`,
    data: result || null,
  });
});

// const getAllFaculty = catchAsync(async (req: Request, res: Response) => {
//   const paginationOptions = pick(req.query, paginationFields);
//   const searchTerm = pick(req.query, ['title']);
//   const result = await facultyService.getAllFaculty(
//     searchTerm as IFaculty,
//     paginationOptions
//   );
//   sendResponse<IFaculty[]>(res, {
//     statusCode: httpStatus.OK,

//     success: true,
//     message: `Faculty retrive successfully.`,
//     data: result || null,
//   });
// });

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const result = await facultyService.getSingleFaculty(req.params.id);
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,

    success: true,
    message: `Faculty get successfully.`,
    data: result || null,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const payload = req.body;
  const result = await facultyService.updateFaculty(id, payload);
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,

    success: true,
    message: `Update faculty successfully.`,
    data: result || null,
  });
});
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await facultyService.deleteFaculty(id);
  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,

    success: true,
    message: `Delete semister successfully.`,
    data: result || null,
  });
});

export const facultyController = {
  createFaculty,
  // getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
