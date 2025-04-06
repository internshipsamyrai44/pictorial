import React, { useEffect, useState } from 'react';
import s from './AccountManagement.module.scss';
import { CurrentSubscription } from '@/features/profile/ui/settings/account-management/current-subscription/CurrentSubscription';
import { AccountSelection } from '@/features/profile/ui/settings/account-management/account-selection/AccountSelection';
import { Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import { useSearchParams } from 'next/navigation';
import { router } from 'next/client';
import { useIsSubscribed } from '@/shared/hooks/useIsSubscribed';

export const AccountManagement = () => {
  // const t = useTranslations('Profile');
  const searchParams = useSearchParams();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(!!searchParams.get('success'));
  const { isSubscribed } = useIsSubscribed();

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('success');
    router.replace(`?${newParams.toString()}`);
  };

  useEffect(() => {
    setIsSuccessModalOpen(!!searchParams.get('success'));
  }, [searchParams]);

  return (
    <div className={s.container}>
      {isSubscribed && <CurrentSubscription />}
      <AccountSelection />

      {isSuccessModalOpen && (
        <Modal onClose={handleCloseSuccessModal} title="Payment Successful" className={s.modal}>
          <p>Payment was successful!! 🎉</p>
        </Modal>
      )}
    </div>
  );
};
