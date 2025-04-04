'use client';

import React, { useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import { StatsItem } from '@/shared/ui/stats-item/StatsItem';
import s from './ProfileDashboard.module.scss';
import VerifiedIcon from '../../../public/icons/verifiedIcon.svg';
import { useGetCurrentSubscriptionsQuery } from '@/features/subscriptions/api/subscriptionsApi';

interface iProps {
  about?: string;
  avatar: string | undefined;
  userFollowers: number;
  userFollowing: number;
  userName: string;
  userPublications: number;
  children?: React.ReactNode;
}

export const ProfileDashboard = ({
  about,
  avatar,
  userFollowers,
  userFollowing,
  userName,
  userPublications,
  children
}: iProps) => {
  const t = useTranslations('Profile');
  const { data: subscriptionsData } = useGetCurrentSubscriptionsQuery();

  const latestSubscription = useMemo(() => {
    if (!subscriptionsData?.data?.length) return null;

    return subscriptionsData.data.reduce((latest, current) => {
      const latestDate = new Date(latest.endDateOfSubscription);
      const currentDate = new Date(current.endDateOfSubscription);

      return currentDate > latestDate ? current : latest;
    });
  }, [subscriptionsData]);

  const isSubscribed = useMemo(() => {
    if (!latestSubscription) return false;

    const endDate = new Date(latestSubscription.endDateOfSubscription);
    return endDate > new Date();
  }, [latestSubscription]);

  return (
    <div className={s.wrapper}>
      <ProfileAvatar height={204} src={avatar} width={204} userName={userName} />
      <div className={s['container-block']}>
        <div className={s['header-block']}>
          <div className={s.name}>
            <Typography as={'h1'} variant={'h1'}>
              {userName}
            </Typography>
            {isSubscribed && <VerifiedIcon width={24} height={24} />}
          </div>
          {children}
        </div>
        <div className={s['stats-block']}>
          <StatsItem value={userFollowing} title={t('Following')} />
          <StatsItem value={userFollowers} title={t('Followers')} />
          <StatsItem value={userPublications} title={t('Publications')} />
        </div>
        <Typography variant={'regular-text-16'} style={{ width: '750px' }}>
          {about}
        </Typography>
      </div>
    </div>
  );
};
