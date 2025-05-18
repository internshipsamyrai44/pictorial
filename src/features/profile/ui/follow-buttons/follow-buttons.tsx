import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import React from 'react';
import { useTranslations } from 'next-intl';
import {
  useFollowMutation,
  useGetUserProfileByUsernameQuery,
  useUnfollowMutation
} from '@/features/search/api/searchApi';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { getIsAuth } from '@/redux/authSlice';

type Props = {
  isMyProfile?: boolean;
  userName: string;
};

export const FollowButtons = ({ isMyProfile, userName }: Props) => {
  const isAuth = useSelector(getIsAuth);
  const { id } = useParams();
  const t = useTranslations('Profile');

  const [follow, { isSuccess: isSuccessFollow }] = useFollowMutation();
  const [unfollow, { isSuccess: isSuccessUnFollow }] = useUnfollowMutation();
  const { data: userData, refetch } = useGetUserProfileByUsernameQuery(userName);

  const userId = Number(id);

  const onFollowHandler = async () => {
    await follow({ selectedUserId: userId });
    refetch();
  };

  const onUnFollowHandler = async () => {
    await unfollow(userId);
    refetch();
  };

  return (
    !isMyProfile &&
    isAuth && (
      <div>
        {!userData?.isFollowing && (
          <Button variant={'primary'} onClick={onFollowHandler} disabled={isSuccessFollow}>
            {t('Follow')}
          </Button>
        )}
        {userData?.isFollowing && (
          <Button variant={'outlined'} onClick={onUnFollowHandler} disabled={isSuccessUnFollow}>
            {t('Unfollow')}
          </Button>
        )}
      </div>
    )
  );
};
