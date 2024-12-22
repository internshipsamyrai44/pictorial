export type RecoveryPasswordRequest = {
  email: string;
  recaptcha: string;
  baseUrl: string;
};

export type LoginRequest = {
  email: string;
  password: string;
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
