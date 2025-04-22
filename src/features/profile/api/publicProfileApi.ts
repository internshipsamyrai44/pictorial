import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@/shared/const/baseApi';
import { PublicUserProfileByIdResponse } from '@/features/profile/model/publicProfileApi.types';

export const publicProfileApi = createApi({
  reducerPath: 'publicProfileApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getPublicUserProfile: build.query<PublicUserProfileByIdResponse, string>({
      query: (profileId) => ({
        url: `v1/public-user/profile/${profileId}`,
        method: 'GET'
      })
    })
  })
});

export const { useGetPublicUserProfileQuery } = publicProfileApi;
