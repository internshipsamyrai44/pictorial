'use client';

import s from './Notifications.module.scss';
import Bell from '../../../../public/icons/Bell';
import { useState } from 'react';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';
import { useMeQuery } from '@/features/auth/api/authApi';
import { usePaginatedNotifs } from '@/shared/hooks/usePaginatedNotifs';
import { useUpdateNotifMarkMutation } from '../api/notificationsApi';
import { NotificationItem } from './notification/NotificationItem';
import { useNotificationSocket } from '@/shared/hooks/useNotificationSocket';

export const Notifications = () => {
  const t = useTranslations('Notifications');
  const [isOpen, setIsOpen] = useState(false);
  const { data: { userId } = {} } = useMeQuery();
  const { notifications, setNotifications } = usePaginatedNotifs(userId?.toString() ?? '');
  const [markAsRead] = useUpdateNotifMarkMutation();
  const filteredNotifs = notifications.filter((n) => n.clientId === userId?.toString());
  const unreadCount = filteredNotifs.filter((n) => !n.isRead).length;

  useNotificationSocket(userId?.toString(), setNotifications);

  const toggleNotifications = async () => {
    setIsOpen((prev) => !prev);
    if (!isOpen && unreadCount > 0) {
      const idsToMark = filteredNotifs.filter((n) => !n.isRead).map((n) => n.id);
      try {
        await markAsRead({ ids: idsToMark });
        setNotifications((prev) => prev.map((n) => (idsToMark.includes(n.id) ? { ...n, isRead: true } : n)));
      } catch (e) {
        console.error('Ошибка при отметке уведомлений как прочитанных', e);
      }
    }
  };

  return (
    <div className={s.notifications} onClick={toggleNotifications}>
      <Bell />
      {!!unreadCount && <span className={s.unreadCount}>{unreadCount}</span>}
      {isOpen && (
        <div className={s.dropdown}>
          <Typography variant={'bold-text-16'} className={s.dropdownHeader}>
            {t('Notifications')}
          </Typography>
          <div className={s.notificationsList}>
            {filteredNotifs.map((notif) => (
              <div key={notif.id} className={s.notificationItem}>
                <NotificationItem isRead={notif.isRead} message={notif.message} notifyAt={notif.notifyAt} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
