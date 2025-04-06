import { inctagramApi } from '@/app/services/inctagram.api';

import {
  CurrentSubscriptions,
  SubscriptionsRequest,
  SubscriptionsResponse,
  PaymentResponse,
} from '@/features/subscriptions/model/subscriptionsApi.types';

export const subscriptionsApi = inctagramApi.injectEndpoints({
  endpoints: (build) => ({
    getCurrentSubscriptions: build.query<CurrentSubscriptions, void>({
      query: () => ({
        url: `/v1/subscriptions/current-payment-subscriptions`,
        method: 'GET'
      }),
      providesTags: ['Subscriptions']
    }),
    getMyPayments: build.query<PaymentResponse[], void>({
      query: () => ({
        url: 'v1/subscriptions/my-payments',
        method: 'GET'
      })
    }),
    createSubscription: build.mutation<SubscriptionsResponse, SubscriptionsRequest>({
      query: (body) => {
        const token = localStorage.getItem('accessToken');
        return {
          url: 'v1/subscriptions',
          method: 'POST',
          body: body,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };
      },
      invalidatesTags: ['Subscriptions']
    })
  })
});

export const { useCreateSubscriptionMutation, useGetCurrentSubscriptionsQuery, useGetMyPaymentsQuery } = subscriptionsApi;
