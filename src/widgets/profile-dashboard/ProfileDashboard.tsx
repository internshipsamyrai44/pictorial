import React from 'react';
import { PATH } from '@/shared/const/PATH';
import { Button, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import Link from 'next/link';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import { StatsItem } from '@/shared/ui/stats-item/StatsItem';
import s from './ProfileDashboard.module.scss';

interface iProps {
  about: string;
  avatar: string;
  isSettings: boolean;
  userFollowers: number;
  userFollowing: number;
  userName: string;
  userPublications: number;
}

export const ProfileDashboard = ({
  about,
  avatar,
  isSettings,
  userFollowers,
  userFollowing,
  userName,
  userPublications
}: iProps) => {
  const settingsButton = isSettings && (
    <Button variant={'secondary'}>
      <Link href={PATH.PROFILE.SETTINGS}>Profile Settings</Link>
    </Button>
  );

  return (
    <div className={s.wrapper}>
      <ProfileAvatar height={204} src={avatar} width={204} />
      <div className={s['container-block']}>
        <div className={s['header-block']}>
          <Typography as={'h1'} variant={'h1'}>
            {userName}
          </Typography>
          {settingsButton}
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
