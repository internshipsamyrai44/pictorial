import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

type ResponseError = {
  status: number | string;
  data: ResponseErrorData;
};

type ResponseErrorData = {
  statusCode: number;
  error: string;
  messages: ErrorMessages[];
};

type ErrorMessages = {
  field: string;
  message: string;
};

export const useRequestError = (error: FetchBaseQueryError | SerializedError | undefined): string | null => {
  let errorMessage: string | null = null;
  const err = error as ResponseError;

  if (!err) return errorMessage;

  if (err.status === 'FETCH_ERROR') {
    errorMessage = 'No internet connection';
  } else if (+err.status >= 500) {
    errorMessage = 'Internal Server Error. Please try again later.';
  } else if (+err.status === 404) {
    errorMessage = err.data.error;
  } else {
    errorMessage = err.data.messages[0].message;
  }

  return errorMessage;
};

// example: const errorMessage = useRequestError(error);
