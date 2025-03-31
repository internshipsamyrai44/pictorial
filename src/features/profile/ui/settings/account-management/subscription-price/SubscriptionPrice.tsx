import s from './SubscriptionPrice.module.scss';
import { Button, RadioGroup, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import PayPallIcon from '../../../../../../../public/icons/paypallIcon.svg';
import { useState } from 'react';
import { useMeQuery } from '@/features/auth/api/authApi';
import { StripeSubscribe } from '@/features/profile/ui/settings/account-management/stripe-subscribe/StripeSubscribe';

export const SubscriptionPrice = () => {
  const { data: me } = useMeQuery();

  const [subscription, setSubscription] = useState<string>('monthly');
  const subscriptionOptions = [
    { label: '$10 per 1 Day', value: 'daily', priceId: 'price_1R8gdY4WbmSHJid2wrxAWJFi' },
    { label: '$50 per 7 Day', value: 'weekly', priceId: 'price_1R8ge34WbmSHJid2crxjc3jX' },
    { label: '$100 per month', value: 'monthly', priceId: 'price_1R8geX4WbmSHJid2n4wLgVXI' }
  ];
  const chosenSubscription = subscriptionOptions.find((option) => option.value === subscription)?.priceId;

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
        <StripeSubscribe priceId={chosenSubscription} userEmail={me?.email} />
      </div>
    </div>
  );
};
