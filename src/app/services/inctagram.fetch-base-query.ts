'use client';

import { baseUrl } from '@/shared/const/baseApi';
import { inctagramApi } from '@/app/services/inctagram.api';
import { PATH } from '@/shared/const/PATH';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { UpdateTokenResponse } from '@/app/services/inctagram.types';
import { useRouter } from 'next/navigation';

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,

  credentials: 'include',

  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }
});

export const baseQueryWithReauth: BaseQueryFn<FetchArgs | string, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = (await baseQuery(
          {
            method: 'POST',
            url: PATH.AUTH.UPDATE_TOKENS
          },
          api,
          extraOptions
        )) as UpdateTokenResponse;

        if (refreshResult.data) {
          localStorage.setItem('accessToken', refreshResult.data.accessToken.trim());
          result = await baseQuery(args, api, extraOptions);
        } else {
          inctagramApi.util.resetApiState();

          localStorage.removeItem('accessToken');
          /*if (!result?.meta?.request.url.includes(PATH.AUTH.ME)) {
            useRouter().push(PATH.AUTH.LOGIN);
          }*/
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
    }
  }

  return result;
};
