import s from './AccountSelection.module.scss';
import { RadioGroup, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useState } from 'react';
import { SubscriptionPrice } from '@/features/profile/ui/settings/account-management/subscription-price/SubscriptionPrice';
import { useIsSubscribed } from '@/shared/hooks/useIsSubscribed';

export const AccountSelection = () => {
  const { isSubscribed } = useIsSubscribed();
  const [accountType, setAccountType] = useState<string>(isSubscribed ? 'business' : 'personal');
  const accountTypeOptions = [
    { label: 'Personal', value: 'personal' },
    { label: 'Business', value: 'business' }
  ];

  return (
    <>
      <div className={s.account}>
        <Typography variant={'h3'}>Account type:</Typography>
        <div className={s.content}>
          <RadioGroup defaultValue={accountType} onValueChange={setAccountType} options={accountTypeOptions} />
        </div>
      </div>
      {accountType === 'business' && <SubscriptionPrice />}
    </>
  );
};
