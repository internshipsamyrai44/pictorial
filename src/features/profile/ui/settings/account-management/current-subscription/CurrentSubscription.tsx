import s from './CurrentSubscription.module.scss';
import { Checkbox, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useIsSubscribed } from '@/shared/hooks/useIsSubscribed';
import { convertToLocalDate } from '@/shared/utils/convertToLocalDate';

export const CurrentSubscription = () => {
  const { latestSubscription } = useIsSubscribed();

  if (!latestSubscription) return null;
  const subscriptionEndDate = convertToLocalDate(latestSubscription.endDateOfSubscription);

  return (
    <div className={s.container}>
      <Typography variant={'h3'}>Current Subscription:</Typography>
      <div className={`${s.content} ${s.activeSubscription}`}>
        <div className={s.date}>
          <span>Expire at</span>
          <p>{subscriptionEndDate}</p>
        </div>
        <div className={s.date}>
          <span>Next payment</span>
          <p>{subscriptionEndDate}</p>
        </div>
      </div>
      <Checkbox label={'Auto-Renewal'} checked={latestSubscription.autoRenewal} />
    </div>
  );
};
