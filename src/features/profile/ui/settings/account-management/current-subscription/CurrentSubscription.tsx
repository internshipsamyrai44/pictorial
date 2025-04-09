import s from './CurrentSubscription.module.scss';
import { Checkbox } from '@internshipsamyrai44-ui-kit/components-lib';
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
          <p>{convertToLocalDate(latestSubscription?.endDateOfSubscription as string)}</p>
        </div>
      </div>
      {subscription.autoRenewal && <Checkbox label={'Auto-Renewal'} checked={subscription.autoRenewal} />}{' '}
    </div>
  );
};
