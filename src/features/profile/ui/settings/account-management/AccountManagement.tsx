import React, { useEffect, useState } from 'react';
import s from './AccountManagement.module.scss';
import { CurrentSubscription } from '@/features/profile/ui/settings/account-management/current-subscription/CurrentSubscription';
import { AccountSelection } from '@/features/profile/ui/settings/account-management/account-selection/AccountSelection';
import { Button, Modal, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useRouter, useSearchParams } from 'next/navigation';

import { useIsSubscribed } from '@/shared/hooks/useIsSubscribed';

export const AccountManagement = () => {
  // const t = useTranslations('Profile');
  const searchParams = useSearchParams();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(!!searchParams.get('success'));
  const { isSubscribed, subscriptionsData } = useIsSubscribed();
  console.log(subscriptionsData);
  const router = useRouter();

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('success');
    router.replace(`?${newParams}`);
  };

  useEffect(() => {
    setIsSuccessModalOpen(!!searchParams.get('success'));
  }, [searchParams]);

  return (
    <div className={s.container}>
      {isSubscribed && (
        <div className={s.activeSubscriptions}>
          <Typography variant={'h3'}>Current Subscription:</Typography>
          {subscriptionsData?.data.map((subscriptionItem) => (
            <CurrentSubscription key={subscriptionItem.subscriptionId} subscription={subscriptionItem} />
          ))}
          <AccountSelection />
        </div>
      )}

      {isSuccessModalOpen && (
        <Modal onClose={handleCloseSuccessModal} title="Success" className={s.modal}>
          <p>Payment was successful!! 🎉</p>
          <Button onClick={handleCloseSuccessModal}>Ok</Button>
        </Modal>
      )}
    </div>
  );
};
