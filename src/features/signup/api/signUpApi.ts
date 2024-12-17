import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@/shared/api/baseApi';
import { SignUpRequest, SignUpResponse } from '@/features/signup';

export const signUpApi = createApi({
  reducerPath: 'signUpApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    signUp: build.mutation<SignUpResponse, SignUpRequest>({
      query: (body) => ({
        url: `auth/registration`,
        method: 'POST',
        body
      })
    })
  })
});

export const { useSignUpMutation } = signUpApi;
