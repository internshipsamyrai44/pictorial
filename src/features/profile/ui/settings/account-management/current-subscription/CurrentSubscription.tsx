import s from './CurrentSubscription.module.scss';
import { ActiveSubscription } from '@/features/subscriptions/model/subscriptionsApi.types';
import { useIsSubscribed } from '@/shared/hooks/useIsSubscribed';
import { convertToLocalDate } from '@/shared/utils/convertToLocalDate';

type Props = {
  subscription: ActiveSubscription;
};

export const CurrentSubscription = ({ subscription }: Props) => {
  const { latestSubscription } = useIsSubscribed();

  return (
    <div className={s.container}>
      <div className={`${s.content} ${s.activeSubscription}`}>
        <div className={s.date}>
          <span>Expire at</span>
          <p>{convertToLocalDate(subscription.endDateOfSubscription)}</p>
        </div>
        <div className={s.date}>
          <span>Next payment</span>
          <p>
            {latestSubscription?.autoRenewal
              ? convertToLocalDate(latestSubscription?.endDateOfSubscription as string)
              : 'Auto Renewal Canceled'}
          </p>
        </div>
      </div>
    </div>
  );
};
