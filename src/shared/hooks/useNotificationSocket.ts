import { NotifsSoketResponse } from '@/features/notifications/model/notifications.types';
import { getCookie } from '../utils/cookieUtils';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { io } from 'socket.io-client';

export const useNotificationSocket = (
  userId: string | undefined,
  setNotifications: Dispatch<SetStateAction<NotifsSoketResponse[]>>
) => {
  const accessToken = getCookie('accessToken');

  useEffect(() => {
    if (!accessToken || !userId) return;
    const socket = io('https://inctagram.work', { query: { accessToken } });

    socket.on('NOTIFICATION', (data: NotifsSoketResponse) => {
      if (data.clientId !== userId) return;

      setNotifications((prev) => {
        const isExists = prev.some((n) => n.id === data.id);
        if (isExists) return prev;
        return [data, ...prev];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [accessToken, userId, setNotifications]);
};
