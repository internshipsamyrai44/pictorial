import { FormSignUp } from '@/features/auth/model/validationScheme';

export type RecoveryPasswordRequest = {
  email: string;
  recaptcha: string;
  baseUrl: string;
};

export type createNewPasswordRequest = {
  newPassword: string;
  recoveryCode: string;
};

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

export type ConfirmRegistrationRequest = {
  confirmationCode: string;
};

export type RegistrationEmailResendingRequest = {
  email: string;
  baseUrl: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  accessToken: string;
};

export type GoogleOAuthRequest = {
  baseUrl?: string;
  code: string | string[] | undefined;
};

export type GoogleOAuthResponse = {
  accessToken: string;
  email: string;
};

export type MeResponse = {
  userId: string;
  userName: string;
  email: string;
  isBlocked: boolean;
};
