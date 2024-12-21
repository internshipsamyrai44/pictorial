import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@/shared/api/baseApi';
import { RegistrationEmailResendingRequest } from '../model/registrationEmailResendingApi.types';

export const registrationEmailResendingApi = createApi({
  reducerPath: 'registrationEmailResending',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    registrationEmailResending: build.mutation<{}, RegistrationEmailResendingRequest>({
      query: (body) => ({
        url: `auth/registration-email-resending`,
        method: 'POST',
        body
      })
    })
  })
});

export const { useRegistrationEmailResendingMutation } = registrationEmailResendingApi;
