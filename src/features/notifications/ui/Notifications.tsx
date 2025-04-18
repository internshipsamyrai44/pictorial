'use client';

import s from './Notifications.module.scss';
import Bell from '../../../../public/icons/Bell';
import { useEffect, useState } from 'react';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';
import { io } from 'socket.io-client';
import { getCookie } from '@/shared/utils/cookieUtils';
import { useMeQuery } from '@/features/auth/api/authApi';
import { usePaginatedNotifs } from '@/shared/hooks/usePaginatedNotifs';
import { useUpdateNotifMarkMutation } from '../api/notificationsApi';
import { NotificationItem } from './notification/NotificationItem';

export const Notifications = () => {
  const t = useTranslations('Notifications');
  const [isOpen, setIsOpen] = useState(false);
  const { data: { userId } = {} } = useMeQuery();
  const accessToken = getCookie('accessToken');

  const { notifications, setNotifications } = usePaginatedNotifs(userId?.toString() ?? '');

  // хук для отметки уведомлений как прочитанных
  const [markAsRead] = useUpdateNotifMarkMutation();

  // отфильтровываем уведомления под наш clientId
  const filteredNotifs = notifications.filter((n) => n.clientId === userId?.toString());

  // подсчет непрочитанных
  const unreadCount = filteredNotifs.filter((n) => !n.isRead).length;

  // подключение к WebSocket
  useEffect(() => {
    if (!accessToken) return;

    const socket = io('https://inctagram.work', { query: { accessToken } });

    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    // получаем уведомление и добавляем его в список
    socket.on('NOTIFICATION', (data) => {
      console.log('📩 New Notification:', data);

      // проверяем clientId
      if (data.clientId !== userId?.toString()) return;

      setNotifications((prev) => {
        const isExists = prev.some((n) => n.id === data.id);
        if (isExists) return prev;
        return [data, ...prev];
      });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    return () => {
      socket.disconnect();
    };
  }, [accessToken, userId, setNotifications]);

  const toggleNotifications = async () => {
    setIsOpen((prev) => !prev);

    // Если открываем уведомления и есть непрочитанные — отправляем на сервер
    if (!isOpen && unreadCount > 0) {
      const idsToMark = filteredNotifs.filter((n) => !n.isRead).map((n) => n.id);

      try {
        await markAsRead({ ids: idsToMark });

        // Обновляем статус уведомлений как прочитанные
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
