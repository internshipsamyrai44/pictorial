import s from './CurrentSubscription.module.scss';
import { useIsSubscribed } from '@/shared/hooks/useIsSubscribed';
import { convertToLocalDate } from '@/shared/utils/convertToLocalDate';
import { useTranslations } from 'next-intl';
import { Checkbox, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import React, { useEffect, useState } from 'react';
import {
  useCancelAutoRenewalSubscriptionMutation,
  useRenewAutoRenewalSubscriptionMutation
} from '@/features/subscriptions/api/subscriptionsApi';
import { Loader } from '@/shared/ui/loader/Loader';

export const CurrentSubscription = () => {
  const t = useTranslations('Profile');
  const { latestSubscription } = useIsSubscribed();
  const [cancelAutoRenewalSubscription, { isLoading: isLoadingCancelAutoRenewal }] =
    useCancelAutoRenewalSubscriptionMutation();
  const [renewAutoRenewalSubscription, { isLoading: isLoadingRenewAutoRenewal }] =
    useRenewAutoRenewalSubscriptionMutation();
  const isLoading = isLoadingCancelAutoRenewal || isLoadingRenewAutoRenewal;

  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handelUnchecked = () => {
    isChecked ? cancelAutoRenewalSubscription() : renewAutoRenewalSubscription();
  };
  useEffect(() => {
    if (latestSubscription?.autoRenewal !== undefined) {
      setIsChecked(latestSubscription.autoRenewal);
    } else {
      setIsChecked(false);
    }
  }, [latestSubscription]);

  return (
    <div className={s.activeSubscriptions}>
      <Typography variant={'h3'}>{t('Subscriptions.CurrentSubscription')}:</Typography>
      <div className={`${s.content} ${s.activeSubscription}`}>
        <div className={s.date}>
          <span>{t('Subscriptions.Expire')}</span>
          <p>{convertToLocalDate(latestSubscription?.endDateOfSubscription as string)}</p>
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
      <Checkbox
        label={t('Subscriptions.AutoRenewal')}
        checked={isChecked}
        onChange={handelUnchecked}
        disabled={isLoading}
      />
      {isLoading && <Loader />}
    </div>
  );
};
