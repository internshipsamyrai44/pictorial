'use client';

import s from './NotificationItem.module.scss';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';

type Props = {
  isRead: boolean;
  message: string;
  notifyAt: string;
};

export const NotificationItem = ({ isRead, message, notifyAt }: Props) => {
  const t = useTranslations('Notifications');

  return (
    <>
      <div className={s.notificationHeader}>
        <Typography variant={'bold-text-16'} className={s.notificationTitle}>
          {t('NewNotification')}
        </Typography>
        {!isRead && (
          <Typography variant={'regular-text-14'} className={s.notificationBadge}>
            {t('New')}
          </Typography>
        )}
      </div>
      <Typography variant={'regular-text-14'}>{message}</Typography>
      <Typography variant={'small-text'} className={s.data}>
        {new Date(notifyAt).toLocaleString()}
      </Typography>
    </>
  );
};
