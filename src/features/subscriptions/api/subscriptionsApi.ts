import { inctagramApi } from '@/app/services/inctagram.api';

import {
  CurrentSubscriptions,
  PaymentResponse,
  SubscriptionsRequest,
  SubscriptionsResponse
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
        return {
          url: 'v1/subscriptions',
          method: 'POST',
          body: body
        };
      },
      invalidatesTags: ['Subscriptions']
    }),
    cancelAutoRenewalSubscription: build.mutation<void, void>({
      query: () => {
        return {
          url: 'v1/subscriptions/canceled-auto-renewal',
          method: 'POST'
        };
      },
      invalidatesTags: ['Subscriptions']
    }),
    renewAutoRenewalSubscription: build.mutation<void, void>({
      query: () => {
        return {
          url: '/v1/subscriptions/renew-auto-renewal',
          method: 'POST'
        };
      },
      invalidatesTags: ['Subscriptions']
    })
  })
});

export const {
  useCreateSubscriptionMutation,
  useGetCurrentSubscriptionsQuery,
  useGetMyPaymentsQuery,
  useCancelAutoRenewalSubscriptionMutation,
  useRenewAutoRenewalSubscriptionMutation
} = subscriptionsApi;
