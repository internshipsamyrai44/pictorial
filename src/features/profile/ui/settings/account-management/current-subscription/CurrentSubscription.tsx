import s from './CurrentSubscription.module.scss';
import { Checkbox, Typography } from '@internshipsamyrai44-ui-kit/components-lib';

export const CurrentSubscription = () => {
  return (
    <div className={s.container}>
      <Typography variant={'h3'}>Current Subscription:</Typography>
      <div className={`${s.content} ${s.activeSubscription}`}>
        <div className={s.date}>
          <span>Expire at</span>
          <p>12.12.2005</p>
        </div>
        <div className={s.date}>
          <span>Next payment</span>
          <p>12.02.2005</p>
        </div>
      </div>
      <Checkbox label={'Auto-Renewal'} />
    </div>
  );
};
