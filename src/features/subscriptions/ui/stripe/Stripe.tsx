'use client';
import { useState } from 'react';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import StripeIcon from '../../../../../public/icons/stripeIcon.svg';
import { ConfirmModal } from '@/features/profile/ui/settings/account-management/confirm-modal/ConfimModal';
import s from './Stripe.module.scss';
import { useCreateSubscriptionMutation } from '@/features/subscriptions/api/subscriptionsApi';
import { SubscriptionType } from '@/features/subscriptions/model/subscriptionsApi.types';

export type SubscriptionTypes = 'day' | 'weekly' | 'monthly';
type Props = {
  chosenSubscription: SubscriptionTypes;
};

export const Stripe = ({ chosenSubscription }: Props) => {
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');

  const [createSubscription] = useCreateSubscriptionMutation();

  const subscriptionPrice = {
    day: 10,
    weekly: 50,
    monthly: 100
  };
  const subscriptionToUpperCase = chosenSubscription.toUpperCase();

  const handleSubscribe = async () => {
    try {
      const response = await createSubscription({
        typeSubscription: subscriptionToUpperCase as SubscriptionType,
        paymentType: 'STRIPE',
        amount: subscriptionPrice[chosenSubscription],
        baseUrl: 'http://localhost:3000/profile/settings?tab=account-management&success=true'
      }).unwrap();

      if (response?.url) {
        setPaymentUrl(response.url);
      }
      setLoading(false);
    } catch (err) {
      console.error('Error subscription:', err);
    }
  };
  return (
    <>
      <div className={s.wrapper}>
        <Button
          variant={'ghost'}
          className={s.payment__btn}
          onClick={() => {
            handleSubscribe();
            setShowConfirmModal(true);
          }}
          disabled={loading}
        >
          <StripeIcon />
        </Button>
      </div>
      {showConfirmModal && (
        <ConfirmModal setShowModal={setShowConfirmModal} paymentUrl={paymentUrl} isLoading={loading} />
      )}
    </>
  );
};
