import s from './AccountSelection.module.scss';
import { RadioGroup, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useState } from 'react';
import { SubscriptionPrice } from '@/features/profile/ui/settings/account-management/subscription-price/SubscriptionPrice';
import { useTranslations } from 'next-intl';

type Props = {
  isSubscribed: boolean;
};

export const AccountSelection = ({ isSubscribed }: Props) => {
  const t = useTranslations('Profile');
  const [accountType, setAccountType] = useState<string>(isSubscribed ? 'business' : 'personal');
  const accountTypeOptions = [
    { label: t('AccountSelection.Personal'), value: 'personal' },
    { label: t('AccountSelection.Business'), value: 'business' }
  ];

  return (
    <>
      <div className={s.account}>
        <Typography variant={'h3'}>{t('AccountSelection.AccountType')}</Typography>
        <div className={s.content}>
          <RadioGroup defaultValue={accountType} onValueChange={setAccountType} options={accountTypeOptions} />
        </div>
      </div>
      {accountType === 'business' && <SubscriptionPrice />}
    </>
  );
};
