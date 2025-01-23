import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@/shared/const/baseApi';
import { GetPublicPostsResponse } from '@/features/public-posts/model/publicPostApi.types';

export const publicUserPostApi = createApi({
  reducerPath: 'publicUserPostApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getPublicUserPost: build.query<GetPublicPostsResponse, number>({
      query: () => ({
        url: `v1/public-posts/all/`,
        method: 'GET'
      })
    })
  })
});

export const { useGetPublicUserPostQuery } = publicUserPostApi;
