export type RecoveryPasswordRequest = {
  email: string;
  recaptcha: string;
  baseUrl: string;
};

export type createNewPasswordRequest = {
  newPassword: string;
  recoveryCode: string;
};
