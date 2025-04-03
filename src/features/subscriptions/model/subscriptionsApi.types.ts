export type MerchantProvider = 'STRIPE' | 'PAYPAL' | 'CREDIT_CARD';
export type SubscriptionType = 'DAILY' | 'WEEKLY' | 'MONTHLY';
export type ActiveSubscription = {
  userId: number;
  subscriptionId: string;
  dateOfPayment: string;
  endDateOfSubscription: string;
  price: number;
  autoRenewal: boolean;
  subscriptionType: SubscriptionType;
  paymentType: MerchantProvider;
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
