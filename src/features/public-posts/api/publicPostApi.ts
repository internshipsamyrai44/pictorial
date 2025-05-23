import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseUrl } from '@/shared/const/baseApi';
import {
  GetPublicPostsByUserIdParams,
  GetPublicPostsParams,
  GetPublicPostsResponse,
  PublicPostResponse
} from '@/features/public-posts/model/publicPostApi.types';

export const publicPostsApi = createApi({
  reducerPath: 'publicPostsApi',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (build) => ({
    getPublicAllPosts: build.query<GetPublicPostsResponse, GetPublicPostsParams | void>({
      query: (arg) => ({
        url: `v1/public-posts/all/`,
        params: arg ?? undefined,
        method: 'GET'
      })
    }),
    getPublicUserPosts: build.query<GetPublicPostsResponse, GetPublicPostsByUserIdParams>({
      query: ({ endCursorPostId, userId, ...arg }) => ({
        url: `v1/public-posts/user/${userId}/${endCursorPostId}`,
        params: arg ?? undefined,
        method: 'GET'
      })
    }),
    getPublicPostsById: build.query<PublicPostResponse, number>({
      query: (postID) => ({
        url: `/v1/public-posts/${postID}`,
        method: 'GET'
      })
    })
  })
});

export const { useGetPublicAllPostsQuery, useGetPublicUserPostsQuery, useGetPublicPostsByIdQuery } = publicPostsApi;
