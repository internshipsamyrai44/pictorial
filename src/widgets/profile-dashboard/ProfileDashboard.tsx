import React from 'react';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import { StatsItem } from '@/shared/ui/stats-item/StatsItem';
import s from './ProfileDashboard.module.scss';

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
  return (
    <div className={s.wrapper}>
      <ProfileAvatar height={204} src={avatar} width={204} userName={userName} />
      <div className={s['container-block']}>
        <div className={s['header-block']}>
          <Typography as={'h1'} variant={'h1'}>
            {userName}
          </Typography>
          {children}
        </div>
        <div className={s['stats-block']}>
          <StatsItem value={userFollowing} title={'following'} />
          <StatsItem value={userFollowers} title={'followers'} />
          <StatsItem value={userPublications} title={'publications'} />
        </div>
        <Typography variant={'regular-text-16'}>{about}</Typography>
      </div>
    </div>
  );
};
