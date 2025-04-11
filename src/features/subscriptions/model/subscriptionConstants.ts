import { SubscriptionType } from '@/features/subscriptions/model/subscriptionsApi.types';
import { SubscriptionTypes } from '@/features/profile/ui/settings/account-management/subscription-price/SubscriptionPrice';

export const SUBSCRIPTION_PRICES: Record<SubscriptionTypes, number> = {
  day: 10,
  weekly: 50,
  monthly: 100
};

export const SUBSCRIPTION_TYPE_MAP: Record<SubscriptionTypes, SubscriptionType> = {
  day: 'DAY',
  weekly: 'WEEKLY',
  monthly: 'MONTHLY'
};
