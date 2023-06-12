import { IGenericErrorMessage } from './errors';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorsMessages: Array<IGenericErrorMessage>;
};
