export const PATH = {
  MAIN: '/',
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
    VERIFICATION_LINK_EXPIRED: '/auth/verification-link-expired',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RECOVERY: '/auth/recovery',
    PRIVACY_POLICY: '/auth/privacy-policy',
    REGISTRATION_CONFIRMATION: '/auth/registration-confirmation',
    TERMS_OF_SERVICE: '/auth/terms-of-service',
    UPDATE_TOKENS: '/auth/update-tokens',
    ME: '/auth/me'
  },
  GITHUB: '/github',
  PROFILE: {
    PROFILE: '/profile',
    PROFILE_USERID: /^\/profile\/[^/]+$/,
    SETTINGS: '/profile/settings'
  },
  PUBLIC: {
    PUBLIC_PAGE: '/public-page'
  }
};
