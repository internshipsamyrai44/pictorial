import React, { useEffect, useState } from 'react';
import s from './AccountManagement.module.scss';
import { CurrentSubscription } from '@/features/profile/ui/settings/account-management/current-subscription/CurrentSubscription';
import { AccountSelection } from '@/features/profile/ui/settings/account-management/account-selection/AccountSelection';
import { useSearchParams } from 'next/navigation';

import { useIsSubscribed } from '@/shared/hooks/useIsSubscribed';
import { SubscriptionModal } from '@/features/profile/ui/settings/account-management/subsribtion-modal/SubsriptionModal';

export const AccountManagement = () => {
  const searchParams = useSearchParams();
  const isPaymentSuccessfull = searchParams.get('?success') === 'true';
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { isSubscribed } = useIsSubscribed();

  useEffect(() => {
    if (searchParams.get('?success')) {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  return (
    <div className={s.container}>
      {isSubscribed && <CurrentSubscription />}
      <AccountSelection isSubscribed={isSubscribed} />
      {isModalOpen && <SubscriptionModal setIsModalOpen={setIsModalOpen} isPaymentSuccessfull={isPaymentSuccessfull} />}
    </div>
  );
};
