import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@/shared/const/baseApi';
import { GetPublicPostsParams, GetPublicPostsResponse } from '@/features/public-posts/model/publicPostApi.types';

export const publicUserPostApi = createApi({
  reducerPath: 'publicUserPostApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getPublicUserPost: build.query<GetPublicPostsResponse, GetPublicPostsParams | void>({
      query: (arg) => ({
        url: `v1/public-posts/all/`,
        params: arg ?? undefined,
        method: 'GET'
      })
    })
  })
});

export const { useGetPublicUserPostQuery } = publicUserPostApi;
