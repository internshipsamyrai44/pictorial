import { useMemo } from 'react';
import { useGetCurrentSubscriptionsQuery } from '@/features/subscriptions/api/subscriptionsApi';

export const useIsSubscribed = () => {
  const { data: subscriptionsData } = useGetCurrentSubscriptionsQuery();

  const latestSubscription = useMemo(() => {
    if (!subscriptionsData?.data?.length) return null;

    return subscriptionsData.data.reduce((latest, current) => {
      const latestDate = new Date(latest.endDateOfSubscription);
      const currentDate = new Date(current.endDateOfSubscription);

      return currentDate > latestDate ? current : latest;
    });
  }, [subscriptionsData]);

  const isBusinessAccount = useMemo(() => {
    if (!latestSubscription) return false;

    const endDate = new Date(latestSubscription.endDateOfSubscription);
    return endDate > new Date();
  }, [latestSubscription]);

  return { isBusinessAccount, latestSubscription, subscriptionsData };
};
