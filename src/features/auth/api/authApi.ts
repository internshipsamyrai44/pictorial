import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@/shared/api/baseApi';
import { createNewPasswordRequest, RecoveryPasswordRequest } from '@/features/auth/model/authApi.types';

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
    })
  })
});

export const { useSendEmailToRecoveryPasswordMutation, useCreateNewPasswordMutation } = authApi;
