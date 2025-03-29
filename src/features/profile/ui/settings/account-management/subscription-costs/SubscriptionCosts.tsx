import s from './SubscriptionCosts.module.scss';
import { Button, RadioGroup, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import PayPallIcon from '../../../../../../../public/icons/paypallIcon.svg';
import StripeIcon from '../../../../../../../public/icons/stripeIcon.svg';
import { useState } from 'react';

export const SubscriptionCosts = () => {
  const [subscription, setSubscription] = useState<string>('monthly');
  const subscriptionOptions = [
    { label: '$10 per 1 Day', value: 'daily' },
    { label: '$50 per 7 Day', value: 'weekly' },
    { label: '$$100 per month', value: 'monthly' }
  ];

  return (
    <div className={s.subscribe}>
      <Typography variant={'h3'}>Your subscription costs:</Typography>
      <div className={s.content}>
        <RadioGroup defaultValue={subscription} onValueChange={setSubscription} options={subscriptionOptions} />
      </div>
      <div className={s.payment}>
        <Button variant={'ghost'} className={s.payment__btn}>
          <PayPallIcon />
        </Button>
        or
        <Button variant={'ghost'} className={s.payment__btn}>
          <StripeIcon />
        </Button>
      </div>
    </div>
  );
};
