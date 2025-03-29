import { useState } from 'react';
import s from './AccountManagement.module.scss';
import { RadioGroup, Typography } from '@internshipsamyrai44-ui-kit/components-lib';

export const AccountManagement = () => {
  // const t = useTranslations('Profile');
  const [accountType, setAccountType] = useState<string>('business');
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
      <div className={s.subscription}>
        <Typography variant={'h3'}>Your subscription costs:</Typography>
        <div className={s.radio}>
          <RadioGroup defaultValue={subscription} onValueChange={setSubscription} options={subscriptionOptions} />
        </div>
      </div>
    </div>
  );
};
