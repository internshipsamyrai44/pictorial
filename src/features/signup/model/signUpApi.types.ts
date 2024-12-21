import { FormSignUp } from '@/features/signup/';

export type SignUpRequest = Omit<FormSignUp, 'confirmPassword' | 'terms'> & { baseUrl: string };

// TODO it's error response
export type SignUpResponse = {
  statusCode: number;
  messages: Array<{
    message: string;
    field: string;
  }>;
  error: string;
};
