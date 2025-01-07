import { inctagramApi } from '@/app/services/inctagram.api';
import { AvatarRequest, AvatarResponse, ProfileFormValues, Profile } from '@/features/profile/model/profileApi.types';

export const profileApi = inctagramApi.injectEndpoints({
  endpoints: (build) => {
    return {
      changeAvatar: build.mutation<AvatarResponse, AvatarRequest>({
        invalidatesTags: ['Profile'],
        query: ({ file }) => {
          const formData = new FormData();

          formData.append('file', file);

          return {
            body: formData,
            method: 'POST',
            url: `v1/users/profile/avatar`
          };
        }
      }),
      deleteAvatar: build.mutation<void, void>({
        invalidatesTags: ['Profile'],
        query: () => ({
          method: 'DELETE',
          url: `v1/users/profile/avatar`
        })
      }),
      getProfile: build.query<Profile, void>({
        providesTags: ['Profile'],
        query: () => ({
          method: 'GET',
          url: `v1/users/profile`
        })
      }),
      updateProfile: build.mutation<void, ProfileFormValues>({
        invalidatesTags: ['Profile'],
        query: (data) => {
          const token = localStorage.getItem('accessToken');

          return {
            body: JSON.stringify(data),
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            method: 'PUT',
            url: `v1/users/profile`
          };
        }
      })
    };
  }
});

export const { useChangeAvatarMutation, useDeleteAvatarMutation, useGetProfileQuery, useUpdateProfileMutation } =
  profileApi;
