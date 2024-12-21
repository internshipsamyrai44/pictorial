import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@/shared/api/baseApi';
import { ConfirmRegistrationRequest } from '../model/confirmRegistrationApi.types';

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
