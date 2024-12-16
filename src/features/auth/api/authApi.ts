import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@/shared/api/baseApi';
import { createNewPasswordRequest, RecoveryPasswordRequest } from '@/features/auth/model/authApi.types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    sendEmailToRecoveryPassword: build.mutation<string, RecoveryPasswordRequest>({
      query: ({ ...patch }) => ({
        url: `auth/password-recovery`,
        method: 'POST',
        body: patch
      })
    }),
    createNewPassword: build.mutation<string, createNewPasswordRequest>({
      query: ({ ...patch }) => ({
        url: `auth/new-password`,
        method: 'POST',
        body: patch
      })
    })
  })
});

export const { useSendEmailToRecoveryPasswordMutation, useCreateNewPasswordMutation } = authApi;
