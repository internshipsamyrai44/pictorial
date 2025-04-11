'use client';
import { useState } from 'react';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import PaypalIcon from '../../../../../public/icons/paypallIcon.svg';
import { ConfirmModal } from '@/features/profile/ui/settings/account-management/confirm-modal/ConfimModal';
import s from './PaypalSubscriptionButton.module.scss';
import { useCreateSubscriptionMutation } from '@/features/subscriptions/api/subscriptionsApi';
import { SUBSCRIPTION_PRICES, SUBSCRIPTION_TYPE_MAP } from '@/features/subscriptions/model/subscriptionConstants';
import { SubscriptionTypes } from '@/features/profile/ui/settings/account-management/subscription-price/SubscriptionPrice';

type Props = {
  chosenSubscription: SubscriptionTypes;
};

export const PaypalSubscriptionButton = ({ chosenSubscription }: Props) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');

  const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();

  const handleSubscribe = async () => {
    try {
      const response = await createSubscription({
        typeSubscription: SUBSCRIPTION_TYPE_MAP[chosenSubscription],
        paymentType: 'PAYPAL',
        amount: SUBSCRIPTION_PRICES[chosenSubscription],
        baseUrl: 'http://localhost:3000/profile/settings?tab=account-management&success=true'
      }).unwrap();

      if (response?.url) {
        setPaymentUrl(response.url);
        setShowConfirmModal(true);
      }
    } catch (err) {
      console.error('Error subscription:', err);
    }
  };
  return (
    <>
      <div className={s.wrapper}>
        <Button variant={'ghost'} className={s.payment__btn} onClick={handleSubscribe}>
          <PaypalIcon />
        </Button>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          setShowModal={setShowConfirmModal}
          paymentUrl={paymentUrl}
          isLoading={isLoading}
          paymentType={'PAYPAL'}
        />
      )}
    </>
  );
};
