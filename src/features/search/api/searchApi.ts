import { inctagramApi } from '@/app/services/inctagram.api';
import { FollowRequest, GetUserByUsernameParams, SearchUserResponse } from '@/features/search/model/searchApi.types';

export const searchApi = inctagramApi.injectEndpoints({
  endpoints: (build) => ({
    getUserByUsername: build.query<SearchUserResponse, GetUserByUsernameParams>({
      query: (params) => ({
        url: 'v1/users/',
        method: 'GET',
        params: {
          search: params.userName,
          pageSize: params.pageSize || 10,
          pageNumber: params.pageNumber || 1,
          cursor: params.cursor || 0
        }
      }),
      providesTags: ['Followers']
    }),
    follow: build.mutation<void, FollowRequest>({
      query: (selectedUserId) => ({
        url: 'v1/users/following',
        method: 'POST',
        body: selectedUserId
      }),
      invalidatesTags: ['Followers']
    }),
    unfollow: build.mutation<void, number>({
      query: (userId: number) => ({
        url: `v1/users/follower/${userId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Followers']
    })
  })
});

export const { useGetUserByUsernameQuery, useLazyGetUserByUsernameQuery, useFollowMutation, useUnfollowMutation } =
  searchApi;
