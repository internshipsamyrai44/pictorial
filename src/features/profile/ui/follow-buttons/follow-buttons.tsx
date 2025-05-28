import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useFollowMutation, useUnfollowMutation } from '@/features/search/api/searchApi';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getIsAuth } from '@/redux/authSlice';
import { UserResponse } from '@/features/search/model/searchApi.types';

type Props = {
  isMyProfile?: boolean;
  refetch: () => void;
  userData?: UserResponse;
};

export const FollowButtons = ({ isMyProfile, refetch, userData }: Props) => {
  const isAuth = useSelector(getIsAuth);
  const { id } = useParams();
  const t = useTranslations('Profile');

  const [follow, { isSuccess: isSuccessFollow, isLoading: isLoadingFollow, reset: resetFollow }] = useFollowMutation();
  const [unfollow, { isSuccess: isSuccessUnFollow, isLoading: isLoadingUnfollow, reset: resetUnfollow }] =
    useUnfollowMutation();

  const userId = Number(id);

  const onFollowHandler = async () => {
    await follow({ selectedUserId: userId });
    refetch();
  };

  const onUnFollowHandler = async () => {
    await unfollow(userId);
    refetch();
  };

  useEffect(() => {
    if (isSuccessFollow) {
      resetFollow();
    }
  }, [isSuccessFollow, resetFollow]);

  useEffect(() => {
    if (isSuccessUnFollow) {
      resetUnfollow();
    }
  }, [isSuccessUnFollow, resetUnfollow]);

  return (
    !isMyProfile &&
    isAuth && (
      <div>
        {!userData?.isFollowing && (
          <Button variant={'primary'} onClick={onFollowHandler} disabled={isLoadingFollow || isSuccessFollow}>
            {t('Follow')}
          </Button>
        )}
        {userData?.isFollowing && (
          <Button variant={'outlined'} onClick={onUnFollowHandler} disabled={isLoadingUnfollow || isSuccessUnFollow}>
            {t('Unfollow')}
          </Button>
        )}
      </div>
    )
  );
};
