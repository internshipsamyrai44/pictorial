import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@/shared/api/baseApi';
import {
  createNewPasswordRequest,
  GoogleOAuthArgs,
  GoogleOAuthResponse,
  LoginRequest,
  LoginResponse,
  RecoveryPasswordRequest
} from '@/features/auth/model/authApi.types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    sendEmailToRecoveryPassword: build.mutation<string, RecoveryPasswordRequest>({
      query: (email) => ({
        url: `auth/password-recovery`,
        method: 'POST',
        body: email
      })
    }),
    createNewPassword: build.mutation<string, createNewPasswordRequest>({
      query: (newPassword) => ({
        url: `auth/new-password`,
        method: 'POST',
        body: newPassword
      })
    }),
    login: build.mutation<LoginResponse, LoginRequest>({
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;

        if (!data) {
          return;
        }
        localStorage.setItem('accessToken', data.accessToken.trim());
      },
      query: (body) => ({
        url: `auth/login`,
        method: 'POST',
        body
      })
    }),
    logout: build.mutation<void, void>({
      async onQueryStarted(_, { queryFulfilled }) {
        await queryFulfilled;
      },
      query: (args) => ({
        body: args,
        credentials: 'include',
        method: 'POST',
        url: `v1/auth/logout`
      })
    }),
    googleOAuth: build.mutation<GoogleOAuthResponse, GoogleOAuthArgs>({
      async onQueryStarted(_, { queryFulfilled }) {
        const { data } = await queryFulfilled;

        if (!data) {
          return;
        }

        localStorage.setItem('accessToken', data.accessToken.trim());
      },

      query: (args) => ({
        body: args,
        method: 'POST',
        url: `auth/google/login`
      })
    })
  })
});

export const {
  useSendEmailToRecoveryPasswordMutation,
  useCreateNewPasswordMutation,
  useLoginMutation,
  useLogoutMutation
} = authApi;
