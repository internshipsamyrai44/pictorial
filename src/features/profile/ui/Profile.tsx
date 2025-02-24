'use client';

import * as React from 'react';
import { useGetUserByUserNameQuery } from '@/features/profile/api/profileApi';
import { ProfileDashboard } from '@/widgets/profile-dashboard/ProfileDashboard';
import { Button, LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';
import { useGetPublicUserProfileByIdQuery } from '@/features/profile/api/publicProfileApi ';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PATH } from '@/shared/const/PATH';
import { useTranslations } from 'next-intl';

export default function Profile() {
  const { id } = useParams();
  const t = useTranslations('Profile');
  const profileId = id ? +id : undefined;

  const { data: profileData, isLoading: isProfileLoading } = useGetPublicUserProfileByIdQuery(
    profileId !== undefined ? profileId : 0,
    {
      skip: profileId === undefined
    }
  );

  const { data: userData, isLoading: isUserDataLoading } = useGetUserByUserNameQuery(profileData?.userName ?? '', {
    skip: !profileData
  });

  if (isProfileLoading || isUserDataLoading) {
    return <LoaderLinear />;
  }

  return (
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
  );
}
