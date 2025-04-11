import { useState } from 'react';
import { useCreateSubscriptionMutation } from '@/features/subscriptions/api/subscriptionsApi';
import {
  SUBSCRIPTION_PRICES,
  SUBSCRIPTION_TYPE_MAP,
  SubscriptionTypes
} from '@/features/subscriptions/model/subscriptionConstants';
import { MerchantProvider } from '@/features/subscriptions/model/subscriptionsApi.types';

type SubscriptionProps = {
  chosenSubscription: SubscriptionTypes;
  paymentMerchant: MerchantProvider;
};

export const useSubscription = () => {
  const [paymentUrl, setPaymentUrl] = useState('');

  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();

  const subscribe = async ({ chosenSubscription, paymentMerchant }: SubscriptionProps) => {
    try {
      const response = await createSubscription({
        typeSubscription: SUBSCRIPTION_TYPE_MAP[chosenSubscription],
        paymentType: paymentMerchant,
        amount: SUBSCRIPTION_PRICES[chosenSubscription],
        baseUrl: 'http://localhost:3000/profile/settings?tab=account-management&'
      }).unwrap();

      if (response?.url) {
        setPaymentUrl(response.url);
      }
    } catch (err) {
      console.error('Error subscription:', err);
    }
  };

  return { subscribe, isLoading, paymentUrl };
};
