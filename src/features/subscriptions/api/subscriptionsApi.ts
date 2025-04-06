import { inctagramApi } from '@/app/services/inctagram.api';
import { PaymentResponse } from '../model/subscriptionsApi.types';

export const subscriptionsApi = inctagramApi.injectEndpoints({
  endpoints: (build) => ({
    getMyPayments: build.query<PaymentResponse[], void>({
      query: () => ({
        url: 'v1/subscriptions/my-payments',
        method: 'GET'
      })
    })
  })
});

export const { useGetMyPaymentsQuery } = subscriptionsApi;
