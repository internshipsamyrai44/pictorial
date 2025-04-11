import React, { useEffect, useState } from 'react';
import s from './AccountManagement.module.scss';
import { CurrentSubscription } from '@/features/profile/ui/settings/account-management/current-subscription/CurrentSubscription';
import { AccountSelection } from '@/features/profile/ui/settings/account-management/account-selection/AccountSelection';
import { Button, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import { useRouter, useSearchParams } from 'next/navigation';

import { useIsSubscribed } from '@/shared/hooks/useIsSubscribed';
import { useTranslations } from 'next-intl';

export const AccountManagement = () => {
  const t = useTranslations('Profile');
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
      <AccountSelection isSubscribed={isSubscribed} />
      {isSuccessModalOpen && (
        <Modal onClose={handleCloseSuccessModal} title={t('SuccessModal.Title')} className={s.modal}>
          <p>{t('SuccessModal.Text')} 🎉</p>
          <Button onClick={handleCloseSuccessModal}>{t('SuccessModal.Button')}</Button>
        </Modal>
      )}
    </div>
  );
};
