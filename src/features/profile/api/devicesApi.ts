import { inctagramApi } from '@/app/services/inctagram.api';
import { DevicesResponse } from '@/features/profile/model/devices.types';

export const devicesApi = inctagramApi.injectEndpoints({
  endpoints: (build) => ({
    getDevices: build.query<DevicesResponse, void>({
      query: () => ({
        url: 'v1/sessions',
        method: 'GET'
      }),
      providesTags: ['Devices']
    }),
    logoutFromDevice: build.mutation<void, string>({
      query: (deviceId) => ({
        url: `v1/sessions/${deviceId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Devices']
    }),
    terminateAllOtherDevices: build.mutation<void, void>({
      query: () => ({
        url: 'v1/sessions/terminate-all',
        method: 'DELETE'
      }),
      invalidatesTags: ['Devices']
    })
  })
});

export const { useGetDevicesQuery, useLogoutFromDeviceMutation, useTerminateAllOtherDevicesMutation } = devicesApi;
