import { Response } from 'express';
type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data: T | null;
};
const sendResponse = <T>(res: Response, funData: IApiResponse<T>): void => {
  const { statusCode, success, message, data } = funData;
  const responseData: IApiResponse<T> = {
    statusCode,
    message: message || null,
    success,
    data: data || null,
  };
  res.status(statusCode).json(responseData);
};
export default sendResponse;
