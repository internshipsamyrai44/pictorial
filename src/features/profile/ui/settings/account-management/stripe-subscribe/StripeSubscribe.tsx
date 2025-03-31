'use client';
import { useState } from 'react';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import StripeIcon from '../../../../../../../public/icons/stripeIcon.svg';
import { ConfirmModal } from '@/features/profile/ui/settings/account-management/confirm-modal/ConfimModal';
import s from './../subscription-price/SubscriptionPrice.module.scss';

export const StripeSubscribe = ({ priceId, userEmail }: { priceId?: string; userEmail?: string }) => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userEmail,
          priceId: priceId
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Ошибка запроса');
      }

      const data = await res.json();
      window.location.href = data.url;
    } catch (error) {
      console.error('Ошибка подписки:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button variant={'ghost'} className={s.payment__btn} onClick={() => setShowModal(true)} disabled={loading}>
        <StripeIcon />
      </Button>
      {showModal && <ConfirmModal setShowModal={setShowModal} handleSubscribe={handleSubscribe} />}
    </>
  );
};
