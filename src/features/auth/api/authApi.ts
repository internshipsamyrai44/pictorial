import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@/shared/api/baseApi';
import { RecoveryPasswordRequest } from '@/features/auth/model/authApi.types';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    sendEmailToRecoveryPassword: build.mutation<string, RecoveryPasswordRequest>({
      query: (...body) => ({
        url: `auth/password-recovery`,
        method: 'POST',
        body
      })
    })
  })
});

export const { useSendEmailToRecoveryPasswordMutation } = authApi;
