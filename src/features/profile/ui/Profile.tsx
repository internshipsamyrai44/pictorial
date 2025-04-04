'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { ProfileDashboard } from '@/widgets/profile-dashboard/ProfileDashboard';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import ProfilePosts from '@/features/posts/ui/posts/ProfilePosts';
import { PATH } from '@/shared/const/PATH';
import { useGetProfileQuery, useGetUserByUserNameQuery } from '@/features/profile/api/profileApi';

export default function Profile() {
  const t = useTranslations('Profile');

  const { data: profileData } = useGetProfileQuery();
  const { data: userData } = useGetUserByUserNameQuery(profileData?.userName ?? '', { skip: !profileData });

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
        <Button variant="secondary">
          <Link href={PATH.PROFILE.SETTINGS}>{t('ProfileSettings')}</Link>
        </Button>
      </ProfileDashboard>
      {profileData && <ProfilePosts userName={profileData.userName} />}
    </>
  );
}
