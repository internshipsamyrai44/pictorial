'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import { StatsItem } from '@/shared/ui/stats-item/StatsItem';
import s from './ProfileDashboard.module.scss';
import VerifiedIcon from '../../../public/icons/verifiedIcon.svg';
import { useIsSubscribed } from '@/shared/hooks/useIsSubscribed';
import { FollowersModal } from '@/features/profile/ui/followers-modal/FollowersModal';
import { FollowingModal } from '@/features/profile/ui/following-modal/FollowingModal';

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
  const { isSubscribed } = useIsSubscribed();

  const [isFollowersModalOpen, setIsFollowersModalOpen] = useState(false);
  const [isFollowingModalOpen, setIsFollowingModalOpen] = useState(false);

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
          <StatsItem value={userFollowing} title={t('Following')} onClick={handleFollowingClick} />
          <StatsItem value={userFollowers} title={t('Followers')} onClick={handleFollowersClick} />
          <StatsItem value={userPublications} title={t('Publications')} />
        </div>
        <Typography variant={'regular-text-16'} style={{ width: '750px' }}>
          {about}
        </Typography>
      </div>

      <FollowersModal isOpen={isFollowersModalOpen} onClose={closeFollowersModal} userName={userName} />

      <FollowingModal isOpen={isFollowingModalOpen} onClose={closeFollowingModal} userName={userName} />
    </div>
  );
};
