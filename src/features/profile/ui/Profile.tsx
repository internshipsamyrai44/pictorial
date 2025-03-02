'use client';

import * as React from 'react';
import { useGetProfileQuery, useGetUserByUserNameQuery } from '@/features/profile/api/profileApi';
import { ProfileDashboard } from '@/widgets/profile-dashboard/ProfileDashboard';
import { Button, LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';
import Link from 'next/link';
import { PATH } from '@/shared/const/PATH';
import { useTranslations } from 'next-intl';
import ProfilePosts from '@/features/posts/ui/posts/ProfilePosts';

export default function Profile() {
  const t = useTranslations('Profile');
  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery();
  const { data: userData, isLoading: isUserDataLoading } = useGetUserByUserNameQuery(profileData?.userName ?? '', {
    skip: !profileData
  });

  if (isProfileLoading || isUserDataLoading) {
    return <LoaderLinear />;
  }

  return (
    <>
      <ProfileDashboard
        about={profileData?.aboutMe || t('NoInfo')}
        avatar={profileData?.avatars[0]?.url}
        userFollowers={userData?.followersCount || 0}
        userFollowing={userData?.followingCount || 0}
        userName={profileData?.userName || t('NoInfo')}
        userPublications={userData?.publicationsCount || 0}
      >
        <Button variant={'secondary'}>
          <Link href={PATH.PROFILE.SETTINGS}>{t('ProfileSettings')}</Link>
        </Button>
      </ProfileDashboard>
      {profileData && <ProfilePosts userName={profileData.userName} />}
    </>
  );
}
