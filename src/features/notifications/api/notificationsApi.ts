import { inctagramApi } from '@/app/services/inctagram.api';
import { getNotifByProfileResponse, updateNotifMark, updateNotifResponse } from '../model/notifications.types';

export const notificationsApi = inctagramApi.injectEndpoints({
  endpoints: (build) => ({
    updateNotifMark: build.mutation<updateNotifResponse, updateNotifMark>({
      query: (idsNotif) => ({
        url: `v1/notifications/mark-as-read`,
        method: 'PUT',
        body: idsNotif
      }),
      invalidatesTags: ['Notification']
    }),
    deleteNotif: build.mutation<getNotifByProfileResponse, number>({
      query: (id) => ({
        url: `v1/notifications/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Notification']
    }),
    getNotifByProfile: build.query<getNotifByProfileResponse, number | void>({
      query: (cursor) => ({
        url: `/v1/notifications/${cursor ?? ''}`,
        method: 'GET'
      }),
      providesTags: ['Notification']
    })
  })
});

export const { useGetNotifByProfileQuery, useUpdateNotifMarkMutation, useDeleteNotifMutation } = notificationsApi;
