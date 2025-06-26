import { inctagramApi } from '@/app/services/inctagram.api';
import { UserDevicesResponse } from '../model/userDevices.types';

export const userDevicesApi = inctagramApi.injectEndpoints({
  endpoints: (build) => ({
    getUserDevices: build.query<UserDevicesResponse, void>({
      query: () => ({
        url: 'v1/sessions',
        method: 'GET'
      }),
      providesTags: ['UserDevices']
    }),
    logoutFromDevice: build.mutation<void, string>({
      query: (deviceId) => ({
        url: `v1/sessions/${deviceId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['UserDevices']
    }),
    terminateAllOtherDevices: build.mutation<void, void>({
      query: () => ({
        url: 'v1/sessions/terminate-all',
        method: 'DELETE'
      }),
      invalidatesTags: ['UserDevices']
    })
  })
});

export const { useGetUserDevicesQuery, useLogoutFromDeviceMutation, useTerminateAllOtherDevicesMutation } =
  userDevicesApi;
