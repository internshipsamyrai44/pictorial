import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@/shared/api/baseApi';
import { PublicUserProfile } from '@/features/profile/model/publicProfileApi.types';

export const publicProfileApi = createApi({
  reducerPath: 'publicProfileApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getPublicUserProfile: build.query<PublicUserProfile, number>({
      query: (profileId) => ({
        url: `public-user/profile/${profileId}`,
        method: 'GET'
      })
    })
  })
});

export const { useGetPublicUserProfileQuery } = publicProfileApi;
