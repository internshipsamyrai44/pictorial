import React, { useEffect, useState } from 'react';
import s from './AccountManagement.module.scss';
import { CurrentSubscription } from '@/features/profile/ui/settings/account-management/current-subscription/CurrentSubscription';
import { AccountSelection } from '@/features/profile/ui/settings/account-management/account-selection/AccountSelection';
import { Button, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import { useRouter, useSearchParams } from 'next/navigation';

import { useIsSubscribed } from '@/shared/hooks/useIsSubscribed';

export const AccountManagement = () => {
  // const t = useTranslations('Profile');
  const searchParams = useSearchParams();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(!!searchParams.get('success'));
  const { isSubscribed } = useIsSubscribed();

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
      {isSubscribed && <CurrentSubscription />}
      <AccountSelection />

      {isSuccessModalOpen && (
        <Modal onClose={handleCloseSuccessModal} title="Success" className={s.modal}>
          <p>Payment was successful!! 🎉</p>
          <Button onClick={handleCloseSuccessModal}>Ok</Button>
        </Modal>
      )}
    </div>
  );
};
