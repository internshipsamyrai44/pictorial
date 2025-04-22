export type MerchantProvider = 'STRIPE' | 'PAYPAL' | 'CREDIT_CARD';
export type SubscriptionType = 'DAY' | 'WEEKLY' | 'MONTHLY';

export type ActiveSubscription = {
  subscriptionId: string;
  dateOfPayment: string;
  endDateOfSubscription: string;
  autoRenewal?: boolean;
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

export type PaymentResponse = {
  userId: string;
  subscriptionId: string;
  dateOfPayment: string;
  endDateOfSubscription: string;
  price: number;
  subscriptionType: SubscriptionType;
  paymentType: MerchantProvider;
};
