'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import { StatsItem } from '@/shared/ui/stats-item/StatsItem';
import s from './ProfileDashboard.module.scss';
import VerifiedIcon from '../../../public/icons/verifiedIcon.svg';
import { useIsSubscribed } from '@/shared/hooks/useIsSubscribed';
import { FollowButtons } from '@/features/profile/ui/follow-buttons/follow-buttons';

interface iProps {
  about?: string;
  avatar: string | undefined;
  userFollowers: number;
  userFollowing: number;
  userName: string;
  userPublications: number;
  children?: React.ReactNode;
  isMyProfile: boolean;
}

export const ProfileDashboard = ({
  about,
  avatar,
  userFollowers,
  userFollowing,
  userName,
  userPublications,
  children,
  isMyProfile
}: iProps) => {
  const t = useTranslations('Profile');
  const { isBusinessAccount } = useIsSubscribed();
  return (
    <div className={s.wrapper}>
      <ProfileAvatar height={204} src={avatar} width={204} userName={userName} />
      <div className={s['container-block']}>
        <div className={s['header-block']}>
          <div className={s.name}>
            <Typography as={'h1'} variant={'h1'}>
              {userName}
            </Typography>
            {isBusinessAccount && <VerifiedIcon width={24} height={24} />}
            <div className={s.buttons}>
              <FollowButtons isMyProfile={isMyProfile} />
            </div>
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
