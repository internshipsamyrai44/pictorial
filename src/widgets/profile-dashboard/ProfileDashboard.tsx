'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Button, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import { StatsItem } from '@/shared/ui/stats-item/StatsItem';
import s from './ProfileDashboard.module.scss';
import VerifiedIcon from '../../../public/icons/verifiedIcon.svg';
import { useIsSubscribed } from '@/shared/hooks/useIsSubscribed';
import { FollowButtons } from '@/features/profile/ui/follow-buttons/follow-buttons';
import Link from 'next/link';
import { PATH } from '@/shared/const/PATH';
import { useProfileData } from '@/features/profile/hooks/useProfileData';

interface iProps {
  userName: string;
  children?: React.ReactNode;
  isMyProfile?: boolean;
}

export const ProfileDashboard = ({ userName, isMyProfile }: iProps) => {
  const t = useTranslations('Profile');
  const { isBusinessAccount } = useIsSubscribed();
  const { userData, refetch } = useProfileData({ userName });

  if (!userData) {
    return null;
  }

  return (
    <div className={s.wrapper}>
      <ProfileAvatar height={204} src={userData?.avatars[0]?.url} width={204} userName={userName} />
      <div className={s['container-block']}>
        <div className={s['header-block']}>
          <div className={s.name}>
            <Typography as={'h1'} variant={'h1'}>
              {userName}
            </Typography>
            {isBusinessAccount && <VerifiedIcon width={24} height={24} />}
            <div className={s.buttons}>
              <FollowButtons isMyProfile={isMyProfile} userData={userData} refetch={refetch} />
            </div>
          </div>
          {isMyProfile && (
            <Button variant="secondary">
              <Link href={PATH.PROFILE.SETTINGS}>{t('ProfileSettings')}</Link>
            </Button>
          )}
        </div>
        <div className={s['stats-block']}>
          <StatsItem value={userData?.followingCount} title={t('Following')} />
          <StatsItem value={userData?.followersCount} title={t('Followers')} />
          <StatsItem value={userData?.publicationsCount} title={t('Publications')} />
        </div>
        <Typography variant={'regular-text-16'} style={{ width: '750px' }}>
          {userData?.aboutMe || t('NoInfo')}
        </Typography>
      </div>
    </div>
  );
};
