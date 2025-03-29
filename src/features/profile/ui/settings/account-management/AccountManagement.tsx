import { useState } from 'react';
import s from './AccountManagement.module.scss';
import { RadioGroup, Typography } from '@internshipsamyrai44-ui-kit/components-lib';

export const AccountManagement = () => {
  // const t = useTranslations('Profile');
  const [accountType, setAccountType] = useState<string>('personal');
  const accountTypeOptions = [
    { label: 'Personal', value: 'personal' },
    { label: 'Business', value: 'business' }
  ];

  return (
    <div className={s.container}>
      <div className={s.account}>
        <Typography variant={'h3'}>Account type</Typography>
        <div className={s.type}>
          <RadioGroup defaultValue={accountType} onValueChange={setAccountType} options={accountTypeOptions} />
        </div>
      </div>
    </div>
  );
};
