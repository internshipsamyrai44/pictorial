import { inctagramApi } from '@/app/services/inctagram.api';
import { PublicUserProfileByIdResponse } from '@/features/profile/model/publicProfileApi.types';

export const publicProfileApi = inctagramApi.injectEndpoints({
  endpoints: (build) => ({
    getPublicUserProfileById: build.query<PublicUserProfileByIdResponse, string>({
      query: (profileId) => ({
        url: `/v1/public-user/profile/${profileId}`,
        method: 'GET'
      })
    })
  })
});

export const { useGetPublicUserProfileByIdQuery } = publicProfileApi;
