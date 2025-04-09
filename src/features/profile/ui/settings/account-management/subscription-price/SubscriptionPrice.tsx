import s from './SubscriptionPrice.module.scss';
import { RadioGroup, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useState } from 'react';
import { Stripe, SubscriptionTypes } from '@/features/subscriptions/ui/stripe/Stripe';
import { Paypal } from '@/features/subscriptions/ui/paypal/Paypal';

export const SubscriptionPrice = () => {
  const [subscription, setSubscription] = useState<string>('day');
  const subscriptionOptions = [
    { label: '$10 per 1 Day', value: 'day' },
    { label: '$50 per 7 Day', value: 'weekly' },
    { label: '$100 per month', value: 'monthly' }
  ];
  const chosenSubscription = subscriptionOptions.find((option) => option.value === subscription)
    ?.value as SubscriptionTypes;

  return (
    <div className={s.subscribe}>
      <Typography variant={'h3'}>Your subscription costs:</Typography>
      <div className={s.content}>
        <RadioGroup defaultValue={subscription} onValueChange={setSubscription} options={subscriptionOptions} />
      </div>
      <div className={s.payment}>
        <Paypal chosenSubscription={chosenSubscription} />
        or
        <Stripe chosenSubscription={chosenSubscription} />
      </div>
    </div>
  );
};
