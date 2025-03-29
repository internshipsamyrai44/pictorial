import { useState } from 'react';
import s from './AccountManagement.module.scss';
import { Button, RadioGroup, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import StripeIcon from './../../../../../../public/icons/stripeIcon.svg';
import PayPallIcon from './../../../../../../public/icons/paypallIcon.svg';
import { CurrentSubscription } from '@/features/profile/ui/settings/account-management/current-subscription/CurrentSubscription';

export const AccountManagement = () => {
  // const t = useTranslations('Profile');
  const [isSubscribed, setIsSubscribed] = useState(true);
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
      {isSubscribed && <CurrentSubscription />}
      <div className={s.account}>
        <Typography variant={'h3'}>Account type:</Typography>
        <div className={s.content}>
          <RadioGroup defaultValue={accountType} onValueChange={setAccountType} options={accountTypeOptions} />
        </div>
      </div>
      {accountType === 'business' && (
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
            <Button variant={'ghost'} className={s.payment__btn} onClick={() => setIsSubscribed(!isSubscribed)}>
              <StripeIcon />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
