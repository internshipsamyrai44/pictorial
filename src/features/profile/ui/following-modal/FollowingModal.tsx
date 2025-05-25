'use client';

import { Button, Input, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  useGetFollowingByUserNameQuery,
  useFollowUserMutation,
  useUnfollowUserMutation
} from '@/features/profile/api/profileApi';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import s from './FollowingModal.module.scss';
import { Loader } from '@/shared/ui/loader/Loader';
import { UserFollower } from '@/features/profile/model/profileApi.types';
import { PATH } from '@/shared/const/PATH';
import Link from 'next/link';

type FollowingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
};

export const FollowingModal = ({ isOpen, onClose, userName }: FollowingModalProps) => {
  const [open, setOpen] = useState(isOpen);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFollowing, setFilteredFollowing] = useState<UserFollower[]>([]);
  const t = useTranslations('Profile');

  const {
    data: following,
    isLoading,
    isError,
    refetch
  } = useGetFollowingByUserNameQuery(
    {
      userName,
      pageSize: 12,
      search: searchTerm
    },
    {
      skip: !open
    }
  );

  const [followUser] = useFollowUserMutation();
  const [unfollowUser] = useUnfollowUserMutation();

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (following && following.items) {
      if (searchTerm.trim() === '') {
        setFilteredFollowing(following.items);
      } else {
        const filtered = following.items.filter((user) =>
          user.userName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFollowing(filtered);
      }
    }
  }, [following, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFollow = async (userId: number) => {
    try {
      await followUser(userId);
      refetch();
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = async (userId: number) => {
    try {
      await unfollowUser(userId);
      refetch();
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  return (
    <>
      {open && (
        <Modal className={s.modal} title={`${following?.totalCount || 0} ${t('Following')}`} onClose={onClose}>
          <div className={s.modalContent}>
            <Input placeholder={t('Search')} type="search" onChange={handleSearchChange} value={searchTerm} />

            {isLoading && <Loader />}
            {isError && <div className={s.error}>{t('Error loading following')}</div>}
            {filteredFollowing && filteredFollowing.length === 0 && !isLoading && (
              <div className={s.emptyState}>
                <div className={s.noUsers}>{t('Not following anyone yet')}</div>
                <div className={s.emptyStateDescription}>{t('When you follow someone, they will appear here')}</div>
              </div>
            )}
            {filteredFollowing && filteredFollowing.length > 0 && (
              <ul className={s.userList}>
                {filteredFollowing.map((follow) => (
                  <li key={follow.id} className={s.userItem}>
                    <div className={s.userInfo}>
                      <div className={s.userLink}>
                        <Link href={`${PATH.PROFILE.PROFILE}/${follow.userId}`} className={s.userAvatar}>
                          <ProfileAvatar
                            src={follow.avatars[0]?.url}
                            height={40}
                            width={40}
                            userName={follow.userName}
                          />
                        </Link>
                        <div className={s.userName}>{follow.userName}</div>
                      </div>
                    </div>
                    <div className={s.followButton}>
                      {follow.isFollowing ? (
                        <Button variant="outlined" className={s.button} onClick={() => handleUnfollow(follow.userId)}>
                          {t('Unfollow')}
                        </Button>
                      ) : (
                        <Button variant="primary" className={s.button} onClick={() => handleFollow(follow.userId)}>
                          {t('Follow')}
                        </Button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Modal>
      )}
    </>
  );
};
