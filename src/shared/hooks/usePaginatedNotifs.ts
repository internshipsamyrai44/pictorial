import { useGetNotifByProfileQuery } from '@/features/notifications/api/notificationsApi';
import { NotifsResponse } from '@/features/notifications/model/notifications.types';
import { useEffect, useState } from 'react';

export const usePaginatedNotifs = (clientId: string) => {
  const [notifications, setNotifications] = useState<NotifsResponse[]>([]);
  const [cursor, setCursor] = useState<number | undefined>(undefined);
  const [hasMore, setHasMore] = useState(true);

  const { data, isFetching } = useGetNotifByProfileQuery(cursor, {
    skip: cursor === -1
  });

  useEffect(() => {
    if (!data) return;

    // нормализуем API уведомления под формат WebSocket уведомлений
    const normalizedItems: NotifsResponse[] = data.items.map((item) => ({
      ...item,
      notifyAt: item.createdAt,
      clientId: clientId
    }));

    setNotifications((prev) => {
      const merged = [...prev, ...normalizedItems];
      const unique = Array.from(new Map(merged.map((n) => [n.id, n])).values());
      return unique.sort((a, b) => +new Date(b.notifyAt) - +new Date(a.notifyAt));
    });

    const last = data.items[data.items.length - 1];
    setCursor(last?.id ?? -1);
    if (data.items.length < (data.pageSize ?? 12)) setHasMore(false);
  }, [data, clientId]);

  const loadMore = () => {
    if (isFetching || !hasMore) return;
    setCursor((prev) => prev); // триггерим повторный запрос
  };

  return {
    notifications,
    setNotifications,
    isFetching,
    hasMore,
    loadMore
  };
};
