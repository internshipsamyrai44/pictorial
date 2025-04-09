import s from './CurrentSubscription.module.scss';
import { ActiveSubscription } from '@/features/subscriptions/model/subscriptionsApi.types';
import { useIsSubscribed } from '@/shared/hooks/useIsSubscribed';
import { convertToLocalDate } from '@/shared/utils/convertToLocalDate';
import { useTranslations } from 'next-intl';

type Props = {
  subscription: ActiveSubscription;
};

export const CurrentSubscription = ({ subscription }: Props) => {
  const t = useTranslations('Profile');
  const { latestSubscription } = useIsSubscribed();

  return (
    <div className={s.container}>
      <div className={`${s.content} ${s.activeSubscription}`}>
        <div className={s.date}>
          <span>{t('Subscriptions.Expire')}</span>
          <p>{convertToLocalDate(subscription.endDateOfSubscription)}</p>
        </div>
        <div className={s.date}>
          <span>{t('Subscriptions.NextPayment')}</span>
          <p>
            {latestSubscription?.autoRenewal
              ? convertToLocalDate(latestSubscription?.endDateOfSubscription as string)
              : t('Subscriptions.AutoRenewalCanceled')}
          </p>
        </div>
      </div>
    </div>
  );
};
