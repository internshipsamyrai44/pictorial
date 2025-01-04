import { FormSignUp } from '@/features/auth/model/validationScheme';

export type RecoveryPasswordRequest = {
  email: string;
  recaptcha: string;
  baseUrl: string;
};

export type SignUpRequest = Omit<FormSignUp, 'confirmPassword' | 'terms'> & { baseUrl: string };

export type SignUpResponse = {
  statusCode: number;
  messages: Array<{
    message: string;
    field: string;
  }>;
  error: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type createNewPasswordRequest = {
  newPassword: string;
  recoveryCode: string;
};

export type GoogleOAuthResponse = {
  accessToken: string;
  email: string;
};

export type GoogleOAuthArgs = {
  baseUrl?: string;
  code: string | string[] | undefined;
};

export type GithubOAuthResponse = {
  url: string;
};

export type GithubOAuthArgs = {
  redirectUrl: string;
};

export type MeResponse = {
  userId: string;
  userName: string;
  email: string;
  isBlocked: boolean;
};
