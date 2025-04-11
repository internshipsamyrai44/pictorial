import React, { useEffect, useState } from 'react';
import s from './AccountManagement.module.scss';
import { CurrentSubscription } from '@/features/profile/ui/settings/account-management/current-subscription/CurrentSubscription';
import { AccountSelection } from '@/features/profile/ui/settings/account-management/account-selection/AccountSelection';
import { Button, Checkbox, Modal, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useRouter, useSearchParams } from 'next/navigation';

import { useIsSubscribed } from '@/shared/hooks/useIsSubscribed';
import { useCanselAutoRenewalSubscriptionMutation } from '@/features/subscriptions/api/subscriptionsApi';
import { useTranslations } from 'next-intl';

export const AccountManagement = () => {
  const t = useTranslations('Profile');
  const searchParams = useSearchParams();
  const [cancelAutoRenewalSubscription] = useCanselAutoRenewalSubscriptionMutation();
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(!!searchParams.get('success'));
  const { isSubscribed, latestSubscription } = useIsSubscribed();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const router = useRouter();

  const handelUnchecked = () => {
    isChecked ? cancelAutoRenewalSubscription() : setIsChecked(true);
  };

  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
    const newParams = new URLSearchParams(searchParams);
    newParams.delete('success');
    router.replace(`?${newParams}`);
  };

  useEffect(() => {
    setIsSuccessModalOpen(!!searchParams.get('success'));
  }, [searchParams]);

  useEffect(() => {
    if (latestSubscription?.autoRenewal !== undefined) {
      setIsChecked(latestSubscription.autoRenewal);
    } else {
      setIsChecked(false);
    }
  }, [latestSubscription]);

  return (
    <div className={s.container}>
      {isSubscribed && (
        <div className={s.activeSubscriptions}>
          <Typography variant={'h3'}>{t('Subscriptions.CurrentSubscription')}:</Typography>
          <CurrentSubscription />
          <Checkbox label={t('Subscriptions.AutoRenewal')} checked={isChecked} onChange={handelUnchecked} />
          <AccountSelection />
        </div>
      )}

      {isSuccessModalOpen && (
        <Modal onClose={handleCloseSuccessModal} title={t('SuccessModal.Title')} className={s.modal}>
          <p>{t('SuccessModal.Text')} 🎉</p>
          <Button onClick={handleCloseSuccessModal}>{t('SuccessModal.Button')}</Button>
        </Modal>
      )}
    </div>
  );
};
