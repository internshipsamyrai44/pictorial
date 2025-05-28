import { inctagramApi } from '@/app/services/inctagram.api';
import {
  FollowRequest,
  GetUserByUsernameParams,
  SearchUserResponse,
  UserResponse
} from '@/features/search/model/searchApi.types';

export const searchApi = inctagramApi.injectEndpoints({
  endpoints: (build) => ({
    searchUsersByUsername: build.query<SearchUserResponse, GetUserByUsernameParams>({
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
    getUserProfileByUsername: build.query<UserResponse, string>({
      query: (userName) => ({
        url: `v1/users/${userName}`,
        method: 'GET'
      }),
      providesTags: ['Followers']
    }),
    follow: build.mutation<void, FollowRequest>({
      query: (request) => ({
        url: 'v1/users/following',
        method: 'POST',
        body: request
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

export const {
  useSearchUsersByUsernameQuery,
  useLazySearchUsersByUsernameQuery,
  useFollowMutation,
  useUnfollowMutation,
  useGetUserProfileByUsernameQuery
} = searchApi;
