import { useState } from 'react';
import s from './AccountManagement.module.scss';
import { CurrentSubscription } from '@/features/profile/ui/settings/account-management/current-subscription/CurrentSubscription';
import { AccountSelection } from '@/features/profile/ui/settings/account-management/account-selection/AccountSelection';

export const AccountManagement = () => {
  // const t = useTranslations('Profile');
  const [isSubscribed, setIsSubscribed] = useState(true);

  return (
    <div className={s.container}>
      {isSubscribed && <CurrentSubscription />}
      <AccountSelection setIsSubscribed={setIsSubscribed} />
    </div>
  );
};
