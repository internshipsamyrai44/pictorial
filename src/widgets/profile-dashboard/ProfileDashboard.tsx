'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import { StatsItem } from '@/shared/ui/stats-item/StatsItem';
import s from './ProfileDashboard.module.scss';
import VerifiedIcon from '../../../public/icons/verifiedIcon.svg';
import { useIsSubscribed } from '@/shared/hooks/useIsSubscribed';
import { FollowersModal } from '@/features/profile/ui/followers-modal/FollowersModal';
import { FollowingModal } from '@/features/profile/ui/following-modal/FollowingModal';
import { FollowButtons } from '@/features/profile/ui/follow-buttons/follow-buttons';
import Link from 'next/link';
import { PATH } from '@/shared/const/PATH';
import { useGetUserProfileByUsernameQuery } from '@/features/search/api/searchApi';
import { useAuth } from '@/shared/hooks/useAuth';
import { PublicUserProfileByIdResponse } from '@/features/profile/model/publicProfileApi.types';

type Props = {
  userName: string;
  isMyProfile?: boolean;
  publicProfileData?: PublicUserProfileByIdResponse;
};

export const ProfileDashboard = ({ userName, publicProfileData, isMyProfile = false }: Props) => {
  const { isAuth } = useAuth();
  const t = useTranslations('Profile');

  const { isBusinessAccount } = useIsSubscribed();

  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

  const { data: userData, refetch } = useGetUserProfileByUsernameQuery(userName, {
    skip: !isAuth
  });

  const followingCount = isAuth && userData ? userData.followingCount : publicProfileData?.userMetadata.following || 0;
  const followersCount = isAuth && userData ? userData.followersCount : publicProfileData?.userMetadata.followers || 0;
  const publications =
    isAuth && userData ? userData.publicationsCount : publicProfileData?.userMetadata.publications || 0;
  const aboutMe = isAuth && userData ? userData.aboutMe : publicProfileData?.aboutMe || t('NoInfo');
  const avatarUrl =
    isAuth && userData?.avatars?.[0]?.url ? userData.avatars[0].url : publicProfileData?.avatars?.[0]?.url;

  const handleFollowersClick = () => {
    setIsFollowersModalOpen(true);
  };

  const handleFollowingClick = () => {
    setIsFollowingModalOpen(true);
  };

  const closeFollowersModal = () => {
    setIsFollowersModalOpen(false);
  };

  const closeFollowingModal = () => {
    setIsFollowingModalOpen(false);
  };

  return (
    <div className={s.wrapper}>
      <ProfileAvatar height={204} src={avatarUrl} width={204} userName={userName} />
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
          <StatsItem value={followingCount} title={t('Following')} onClick={handleFollowingClick} />
          <StatsItem value={followersCount} title={t('Followers')} onClick={handleFollowersClick} />
          <StatsItem value={publications} title={t('Publications')} />
        </div>
        <Typography variant={'regular-text-16'} style={{ width: '750px' }}>
          {aboutMe}
        </Typography>
      </div>

      <FollowersModal isOpen={isFollowersModalOpen} onClose={closeFollowersModal} userName={userName} />

      <FollowingModal isOpen={isFollowingModalOpen} onClose={closeFollowingModal} userName={userName} />
    </div>
  );
};
