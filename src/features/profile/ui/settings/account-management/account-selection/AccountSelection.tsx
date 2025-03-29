import s from './AccountSelection.module.scss';
import { RadioGroup, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useState } from 'react';
import { SubscriptionCosts } from '@/features/profile/ui/settings/account-management/subscription-costs/SubscriptionCosts';

type Props = {
  // eslint-disable-next-line no-unused-vars
  setIsSubscribed: (isSubscribed: boolean) => void;
};

export const AccountSelection = ({ setIsSubscribed }: Props) => {
  const [accountType, setAccountType] = useState<string>('personal');
  const accountTypeOptions = [
    { label: 'Personal', value: 'personal' },
    { label: 'Business', value: 'business' }
  ];
  const subscribeHandele = () => {
    setIsSubscribed(true);
  };
  return (
    <>
      <div className={s.account}>
        <Typography variant={'h3'}>Account type:</Typography>
        <div className={s.content} onClick={subscribeHandele}>
          <RadioGroup defaultValue={accountType} onValueChange={setAccountType} options={accountTypeOptions} />
        </div>
      </div>
      {accountType === 'business' && <SubscriptionCosts />}
    </>
  );
};
