'use client';
import { useState } from 'react';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import StripeIcon from '../../../../../public/icons/stripeIcon.svg';
import { ConfirmModal } from '@/features/profile/ui/settings/account-management/confirm-modal/ConfimModal';
import s from './StripeSubscriptionButton.module.scss';
import { useSubscription } from '@/shared/hooks/useSubscription';
import { SubscriptionTypes } from '@/features/subscriptions/model/subscriptionConstants';

type Props = {
  chosenSubscription: SubscriptionTypes;
};

export const StripeSubscriptionButton = ({ chosenSubscription }: Props) => {
  const { subscribe, isLoading, paymentUrl } = useSubscription();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSubscribe = () => {
    subscribe({ chosenSubscription, paymentMerchant: 'STRIPE' });
    setShowConfirmModal(true);
  };
  return (
    <div className={s.wrapper}>
      <Button variant={'ghost'} className={s.payment__btn} onClick={handleSubscribe}>
        <StripeIcon />
      </Button>
      {showConfirmModal && (
        <ConfirmModal setShowModal={setShowConfirmModal} paymentUrl={paymentUrl} isLoading={isLoading} />
      )}
    </div>
  );
};
