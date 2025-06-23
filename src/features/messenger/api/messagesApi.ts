import { messengerApi } from './messenger.api';
import type { getMessagesResponse, LastMessages, Messages, updateMessageRequest } from './messenger.type';

export const messagesApi = messengerApi.injectEndpoints({
  endpoints: (build) => ({
    getLastMessages: build.query<getMessagesResponse<LastMessages>, void>({
      query: () => ({
        url: `/v1/messenger`,
        method: 'GET'
      }),
      providesTags: ['Messages']
    }),
    getMessagesbyId: build.query<getMessagesResponse<Messages>, { ownerId: number }>({
      query: ({ ownerId }) => ({
        url: `/v1/messenger/${ownerId}`,
        method: 'GET'
      }),
      providesTags: ['Messages']
    }),
    updateMessageStatus: build.mutation<void, { ids: number[] }>({
      query: (body) => ({
        url: `/v1/messenger/messenger`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Messages']
    }),
    deleteMessagesbyId: build.mutation<void, updateMessageRequest>({
      query: ({ id }) => ({
        url: `/v1/messenger/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Messages']
    })
  })
});

export const { useGetLastMessagesQuery, useGetMessagesbyIdQuery } = messagesApi;
