'use client';
import { useState } from 'react';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import s from '@/features/profile/ui/settings/account-management/subscription-price/SubscriptionPrice.module.scss';
import StripeIcon from '../../../../../../../public/icons/stripeIcon.svg';

export const StripeSubscribe = ({ priceId, userEmail }: { priceId?: string; userEmail?: string }) => {
  const [loading, setLoading] = useState(false);

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
      console.log('Subscription ID:', data.subscriptionId);
    } catch (error) {
      console.error('Ошибка подписки:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant={'ghost'} className={s.payment__btn} onClick={handleSubscribe} disabled={loading}>
      <StripeIcon />
    </Button>
  );
};
