'use client';

import s from './Notifications.module.scss';
import Bell from '../../../../public/icons/Bell';
import { useState } from 'react';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';

export const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount] = useState(4);
  const t = useTranslations('Notifications');

  const toggleNotifications = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={s.notifications} onClick={toggleNotifications}>
      <Bell />
      <span className={s.unreadCount}>{unreadCount}</span>
      {isOpen && (
        <div className={s.dropdown}>
          <Typography variant={'bold-text-16'} className={s.dropdownHeader}>
            {t('Notifications')}
          </Typography>
          <div className={s.notificationsList}>
            {/* Map through notifications here */}
            <div className={s.notificationItem}>
              <div className={s.notificationHeader}>
                <Typography variant={'bold-text-16'} className={s.notificationTitle}>
                  {t('NewNotification')}
                </Typography>
                <Typography variant={'regular-text-14'} className={s.notificationBadge}>
                  {t('New')}
                </Typography>
              </div>
              <Typography variant={'regular-text-14'}>{t('NextPaymentTomorrow')}</Typography>
              <Typography variant={'small-text'} className={s.data}>
                2 часа назад
              </Typography>
            </div>
            <div className={s.notificationItem}>Notification 2</div>
          </div>
        </div>
      )}
    </div>
  );
};
