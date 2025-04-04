import s from './SubscriptionPrice.module.scss';
import { Button, RadioGroup, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import PayPallIcon from '../../../../../../../public/icons/paypallIcon.svg';
import { useState } from 'react';
import {
  StripeSubscribe,
  SubscriptionTypes
} from '@/features/subscriptions/ui/stripe/stripe-subscribe/StripeSubscribe';

export const SubscriptionPrice = () => {
  const [subscription, setSubscription] = useState<string>('daily');
  const subscriptionOptions = [
    { label: '$10 per 1 Day', value: 'daily', priceId: 'price_1R8gdY4WbmSHJid2wrxAWJFi' },
    { label: '$50 per 7 Day', value: 'weekly', priceId: 'price_1R8ge34WbmSHJid2crxjc3jX' },
    { label: '$100 per month', value: 'monthly', priceId: 'price_1R8geX4WbmSHJid2n4wLgVXI' }
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
        <Button variant={'ghost'} className={s.payment__btn} disabled>
          <PayPallIcon />
        </Button>
        or
        <StripeSubscribe chosenSubscription={chosenSubscription} />
      </div>
    </div>
  );
};
