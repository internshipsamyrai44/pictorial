export type MerchantProvider = 'STRIPE' | 'PAYPAL' | 'CREDIT_CARD';
export type SubscriptionType = 'DAILY' | 'WEEKLY' | 'MONTHLY';

export type ActiveSubscription = {
  subscriptionId: string;
  dateOfPayment: string;
  endDateOfSubscription: string;
  autoRenewal: boolean;
};

export type CurrentSubscriptions = {
  data: ActiveSubscription[];
  hasAutoRenewal: boolean;
};

export type SubscriptionsRequest = {
  typeSubscription: SubscriptionType;
  paymentType: MerchantProvider;
  amount: number;
  baseUrl: string;
};

export type SubscriptionsResponse = {
  url: 'string';
};
