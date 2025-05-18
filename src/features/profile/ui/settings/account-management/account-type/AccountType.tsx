import s from './AccountType.module.css';
import { RadioGroup, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useEffect, useState } from 'react';
import { SubscriptionPrice } from '@/features/profile/ui/settings/account-management/subscription-price/SubscriptionPrice';
import { useTranslations } from 'next-intl';

type Props = {
  isBusinessAccount: boolean;
};

export const AccountType = ({ isBusinessAccount }: Props) => {
  const t = useTranslations('Profile');
  const [accountType, setAccountType] = useState<string>('personal');
  const accountTypeOptions = [
    { label: t('AccountSelection.Personal'), value: 'personal' },
    { label: t('AccountSelection.Business'), value: 'business' }
  ];
  useEffect(() => {
    if (isBusinessAccount) {
      setAccountType('business');
    }
  }, [isBusinessAccount]);

  return (
    <>
      <div className={s.account}>
        <Typography variant={'h3'}>{t('AccountSelection.AccountType')}</Typography>
        <div className={s.content}>
          <RadioGroup value={accountType} onValueChange={setAccountType} options={accountTypeOptions} />
        </div>
      </div>
      {accountType === 'business' && <SubscriptionPrice />}
    </>
  );
};
