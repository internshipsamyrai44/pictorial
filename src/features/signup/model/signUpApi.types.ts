import { FormSignUp } from './validationScheme';
export type SignUpRequest = Omit<FormSignUp, 'confirmPassword' | 'terms'> & { baseUrl: string };

export type SignUpResponse = {
  statusCode: number;
  messages: Array<{
    message: string;
    field: string;
  }>;
  error: string;
};
