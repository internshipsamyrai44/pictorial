import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@/shared/const/baseApi';
import { ConfirmRegistrationRequest } from '@/features/auth/model/confirmRegistrationApi.types';

export const confirmRegistrationApi = createApi({
  reducerPath: 'confirmRegistrationApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    confirmRegistration: build.mutation<{}, ConfirmRegistrationRequest>({
      query: (body) => ({
        url: `auth/registration-confirmation`,
        method: 'POST',
        body
      })
    })
  })
});

export const { useConfirmRegistrationMutation } = confirmRegistrationApi;
