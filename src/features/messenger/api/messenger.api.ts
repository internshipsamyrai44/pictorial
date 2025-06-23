import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './messenger.fetch-base-query';

export const messengerApi = createApi({
  reducerPath: 'messengerApi',
  baseQuery: baseQuery,
  endpoints: () => ({}),
  tagTypes: ['Messages']
});
