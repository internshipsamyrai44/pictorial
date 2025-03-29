import { useState } from 'react';
import s from './AccountManagement.module.scss';
import { Button, RadioGroup, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import StripeIcon from './../../../../../../public/icons/stripeIcon.svg';
import PayPallIcon from './../../../../../../public/icons/paypallIcon.svg';

export const AccountManagement = () => {
  // const t = useTranslations('Profile');
  const [accountType, setAccountType] = useState<string>('personal');
  const accountTypeOptions = [
    { label: 'Personal', value: 'personal' },
    { label: 'Business', value: 'business' }
  ];
  const [subscription, setSubscription] = useState<string>('monthly');
  const subscriptionOptions = [
    { label: '$10 per 1 Day', value: 'daily' },
    { label: '$50 per 7 Day', value: 'weekly' },
    { label: '$$100 per month', value: 'monthly' }
  ];

  return (
    <div className={s.container}>
      <div className={s.account}>
        <Typography variant={'h3'}>Account type</Typography>
        <div className={s.radio}>
          <RadioGroup defaultValue={accountType} onValueChange={setAccountType} options={accountTypeOptions} />
        </div>
      </div>
      {accountType === 'business' && (
        <div className={s.subscription}>
          <Typography variant={'h3'}>Your subscription costs:</Typography>
          <div className={s.radio}>
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
      )}
    </div>
  );
};
