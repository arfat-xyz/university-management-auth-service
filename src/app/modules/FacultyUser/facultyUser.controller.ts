/* eslint-disable no-unused-vars */
import { Request, Response } from 'express';
import catchAsync from '../../../Shared/catchAsync';

import sendResponse from '../../../Shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../Shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IFacultyUser, IFacultyUsersFilters } from './facultyUser.interface';
import { FacultyUsersService } from './facultyUser.service';
import { FacultyUsersSearchableFields } from './facultyUser.constant';

const getAllFacultyUsers = catchAsync(
  // eslint-disable-next-line no-unused-vars
  async (req: Request, res: Response) => {
    // const paginationOptions: IPaginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy as string,
    //   sortOrder: req.query.sortOrder as 'asc' | 'desc',
    // };
    const paginationOptions = pick(req.query, paginationFields);
    const filters = pick(req.query, FacultyUsersSearchableFields);
    const result = await FacultyUsersService.getAllFacultyUsers(
      filters as IFacultyUsersFilters,
      paginationOptions
    );

    sendResponse<IFacultyUser[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Faculty user retrive successfully.`,
      meta: result.meta || null,
      data: result.data || null,
    });
  }
);

const getSingleFacultyUsers = catchAsync(
  async (req: Request, res: Response) => {
    const result = await FacultyUsersService.getSingleFacultyUsers(
      req.params.id
    );
    sendResponse<IFacultyUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: `Faculty user  retrive successfully.`,
      data: result || null,
    });
  }
);

const updateFacultyUsers = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await FacultyUsersService.updateFacultyUsers(id, updatedData);
  sendResponse<IFacultyUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Faculty user updated successfully.`,
    data: result || null,
  });
});

const deleteFacultyUsers = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyUsersService.deleteFacultyUsers(id);
  sendResponse<IFacultyUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `Faculty user deleted successfully.`,
    data: result || null,
  });
});

export const FacultyUsersController = {
  getSingleFacultyUsers,
  getAllFacultyUsers,
  updateFacultyUsers,
  deleteFacultyUsers,
};
