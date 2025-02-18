import {
  ConfirmRegistrationRequest,
  createNewPasswordRequest,
  GoogleOAuthRequest,
  GoogleOAuthResponse,
  LoginRequest,
  LoginResponse,
  MeResponse,
  RecoveryPasswordRequest,
  RegistrationEmailResendingRequest,
  SignUpRequest,
  SignUpResponse
} from '@/features/auth/model/authApi.types';
import { inctagramApi } from '@/app/services/inctagram.api';
import { deleteCookie, setCookie } from '@/shared/utils/cookieUtils';
import { setAuth } from '@/redux/authSlice';

export const authApi = inctagramApi.injectEndpoints({
  endpoints: (build) => ({
    sendEmailToRecoveryPassword: build.mutation<string, RecoveryPasswordRequest>({
      query: (email) => ({
        url: `v1/auth/password-recovery`,
        method: 'POST',
        body: email
      })
    }),
    createNewPassword: build.mutation<string, createNewPasswordRequest>({
      query: (newPassword) => ({
        url: `v1/auth/new-password`,
        method: 'POST',
        body: newPassword
      })
    }),
    signUp: build.mutation<SignUpResponse, SignUpRequest>({
      query: (body) => ({
        url: `v1/auth/registration`,
        method: 'POST',
        body
      })
    }),
    confirmRegistration: build.mutation<{}, ConfirmRegistrationRequest>({
      query: (body) => ({
        url: `v1/auth/registration-confirmation`,
        method: 'POST',
        body
      })
    }),
    registrationEmailResending: build.mutation<{}, RegistrationEmailResendingRequest>({
      query: (body) => ({
        url: `v1/auth/registration-email-resending`,
        method: 'POST',
        body
      })
    }),
    me: build.query<MeResponse, void>({
      providesTags: ['Me'],
      query: () => ({
        url: `v1/auth/me`
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAuth(!!data));
        } catch (error) {
          dispatch(setAuth(false));
        }
      }
    }),
    login: build.mutation<LoginResponse, LoginRequest>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        if (!data) {
          return;
        }
        setCookie('accessToken', data.accessToken.trim(), 7);
        dispatch(setAuth(true));
      },
      query: (body) => ({
        url: `v1/auth/login`,
        method: 'POST',
        body
      })
    }),
    googleOAuth: build.mutation<GoogleOAuthResponse, GoogleOAuthRequest>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const { data } = await queryFulfilled;

        if (!data) {
          return;
        }

        setCookie('accessToken', data.accessToken.trim(), 7);
        dispatch(setAuth(true));
      },

      invalidatesTags: ['Me'],
      query: (args) => ({
        body: args,
        method: 'POST',
        url: `v1/auth/google/login`
      })
    }),
    updateTokens: build.mutation<void, void>({
      query: (args) => ({
        body: args,
        method: 'POST',
        url: `v1/auth/update-tokens`
      })
    }),
    logout: build.mutation<void, void>({
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        await queryFulfilled;
        deleteCookie('accessToken');
        dispatch(setAuth(false));
        dispatch(authApi.util.resetApiState());
      },
      query: (body) => ({
        body,
        method: 'POST',
        url: 'v1/auth/logout'
      })
    })
  })
});

export const {
  useSendEmailToRecoveryPasswordMutation,
  useCreateNewPasswordMutation,
  useSignUpMutation,
  useConfirmRegistrationMutation,
  useRegistrationEmailResendingMutation,
  useLoginMutation,
  useLogoutMutation,
  useGoogleOAuthMutation,
  useMeQuery,
  useLazyMeQuery,
  useUpdateTokensMutation
} = authApi;
