import { inctagramApi } from '@/app/services/inctagram.api';
import { GetUserByUsernameParams, SearchUserResponse } from '@/features/search/model/searchApi.types';

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
      providesTags: ['Search']
    })
  })
});

export const { useGetUserByUsernameQuery, useLazyGetUserByUsernameQuery } = searchApi;
