'use client';

import { Button, Input, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import {
  useGetFollowersByUserNameQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useDeleteUserMutation,
  useGetProfileQuery
} from '@/features/profile/api/profileApi';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import s from './FollowersModal.module.scss';
import Link from 'next/link';
import { PATH } from '@/shared/const/PATH';
import { Loader } from '@/shared/ui/loader/Loader';
import { UserFollower } from '@/features/profile/model/profileApi.types';

type FollowersModalProps = {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
};

export const FollowersModal = ({ isOpen, onClose, userName }: FollowersModalProps) => {
  const [open, setOpen] = useState(isOpen);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFollowers, setFilteredFollowers] = useState<UserFollower[]>([]);
  const t = useTranslations('Profile');
  const { data: user } = useGetProfileQuery();

  const {
    data: followers,
    isLoading,
    isError,
    refetch
  } = useGetFollowersByUserNameQuery(
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
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (followers && followers.items) {
      if (searchTerm.trim() === '') {
        setFilteredFollowers(followers.items);
      } else {
        const filtered = followers.items.filter((user) =>
          user.userName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredFollowers(filtered);
      }
    }
  }, [followers, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFollow = (userId: number) => async () => {
    try {
      await followUser(userId);
      refetch();
    } catch (error) {
      console.error('Error following user:', error);
    }
  };

  const handleUnfollow = (userId: number) => async () => {
    try {
      await unfollowUser(userId);
      refetch();
    } catch (error) {
      console.error('Error unfollowing user:', error);
    }
  };

  const handleDelete = (userId: number) => async () => {
    try {
      await deleteUser(userId);
      refetch();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <>
      {open && (
        <Modal className={s.modal} title={`${followers?.totalCount || 0} ${t('Followers')}`} onClose={onClose}>
          <div className={s.modalContent}>
            <Input placeholder={t('Search')} type="search" onChange={handleSearchChange} value={searchTerm} />

            {isLoading && <Loader />}
            {isError && <div className={s.error}>{t('Error loading followers')}</div>}
            {filteredFollowers && filteredFollowers.length === 0 && !isLoading && (
              <div className={s.emptyState}>
                <div className={s.noUsers}>{t('No followers yet')}</div>
                <div className={s.emptyStateDescription}>{t('When someone follows you, they will appear here')}</div>
              </div>
            )}
            {filteredFollowers && filteredFollowers.length > 0 && (
              <ul className={s.userList}>
                {filteredFollowers.map((follower) => (
                  <li key={follower.id} className={s.userItem}>
                    <div className={s.userInfo}>
                      <Link href={`${PATH.PROFILE.PROFILE}/${follower.userId}`} className={s.userLink}>
                        <div className={s.userAvatar}>
                          <ProfileAvatar
                            src={follower.avatars[0]?.url}
                            height={40}
                            width={40}
                            userName={follower.userName}
                          />
                        </div>
                        <div className={s.userName}>{follower.userName}</div>
                      </Link>
                    </div>
                    <div className={s.buttonsContainer}>
                      {follower.isFollowing ? (
                        <Button variant="outlined" className={s.button} onClick={handleUnfollow(follower.userId)}>
                          {t('Unfollow')}
                        </Button>
                      ) : (
                        <Button variant="primary" className={s.button} onClick={handleFollow(follower.userId)}>
                          {t('Follow')}
                        </Button>
                      )}
                      {user?.userName === userName && (
                        <Button variant="ghost" className={s.button} onClick={handleDelete(follower.userId)}>
                          {t('Delete')}
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
