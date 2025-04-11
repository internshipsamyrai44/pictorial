import s from './SubscriptionPrice.module.scss';
import { RadioGroup, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useState } from 'react';
import { StripeSubscriptionButton } from '@/features/subscriptions/ui/StripeSubscriptionButton/StripeSubscriptionButton';
import { PaypalSubscriptionButton } from '@/features/subscriptions/ui/PaypalSubscriptionButton/PaypalSubscriptionButton';
import { useTranslations } from 'next-intl';

export type SubscriptionTypes = 'day' | 'weekly' | 'monthly';

export const SubscriptionPrice = () => {
  const t = useTranslations('Profile');
  const [subscription, setSubscription] = useState<string>('day');
  const subscriptionOptions = [
    { label: t('SubscriptionCost.Daily'), value: 'day' },
    { label: t('SubscriptionCost.Weekly'), value: 'weekly' },
    { label: t('SubscriptionCost.Monthly'), value: 'monthly' }
  ];
  const chosenSubscription = subscriptionOptions.find((option) => option.value === subscription)
    ?.value as SubscriptionTypes;

  return (
    <div className={s.subscribe}>
      <Typography variant={'h3'}>{t('SubscriptionCost.Title')}:</Typography>
      <div className={s.content}>
        <RadioGroup defaultValue={subscription} onValueChange={setSubscription} options={subscriptionOptions} />
      </div>
      <div className={s.payment}>
        <PaypalSubscriptionButton chosenSubscription={chosenSubscription} />
        {t('SubscriptionCost.Or')}
        <StripeSubscriptionButton chosenSubscription={chosenSubscription} />
      </div>
    </div>
  );
};
