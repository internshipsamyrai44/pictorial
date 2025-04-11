'use client';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import PaypalIcon from '../../../../../public/icons/paypallIcon.svg';
import { ConfirmModal } from '@/features/profile/ui/settings/account-management/confirm-modal/ConfimModal';
import s from './PaypalSubscriptionButton.module.scss';
import { useSubscription } from '@/shared/hooks/useSubscription';
import { useState } from 'react';
import { SubscriptionTypes } from '@/features/subscriptions/model/subscriptionConstants';

type Props = {
  chosenSubscription: SubscriptionTypes;
};

export const PaypalSubscriptionButton = ({ chosenSubscription }: Props) => {
  const { subscribe, isLoading, paymentUrl } = useSubscription();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const paymentMerchant = 'PAYPAL';

  const handleSubscribe = () => {
    subscribe({ chosenSubscription, paymentMerchant });
    setShowConfirmModal(true);
  };
  return (
    <div className={s.wrapper}>
      <Button variant={'ghost'} className={s.payment__btn} onClick={handleSubscribe}>
        <PaypalIcon />
      </Button>
      {showConfirmModal && (
        <ConfirmModal
          setShowModal={setShowConfirmModal}
          paymentUrl={paymentUrl}
          isLoading={isLoading}
          paymentMerchant={paymentMerchant}
        />
      )}
    </div>
  );
};
