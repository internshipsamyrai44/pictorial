'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { useParams } from 'next/navigation';

import { ProfileDashboard } from '@/widgets/profile-dashboard/ProfileDashboard';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import ProfilePosts from '@/features/posts/ui/posts/ProfilePosts';
import { PATH } from '@/shared/const/PATH';
import { useGetProfileQuery, useGetUserByUserNameQuery } from '@/features/profile/api/profileApi';
import { useGetPublicUserProfileQuery } from '@/features/profile/api/publicProfileApi';
import { PublicProfilePosts } from '@/features/public-posts/ui/publicProfilePosts/PublicProfilePosts';

export default function Profile() {
  const t = useTranslations('Profile');
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const { id } = useParams<{ id: string }>();
  const token = localStorage.getItem('sn-token');

  const { data: profileData } = useGetProfileQuery(undefined, { skip: !token });
  const { data: userData } = useGetUserByUserNameQuery(profileData?.userName ?? '', {
    skip: !profileData
  });
  const { data: publicProfileData } = useGetPublicUserProfileQuery(Number(id), {
    skip: !!token
  });

  if (isAuth) {
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
  } else {
    return (
      <>
        <ProfileDashboard
          about={publicProfileData?.aboutMe || t('NoInfo')}
          avatar={publicProfileData?.avatars[0]?.url}
          userFollowers={publicProfileData?.userMetadata?.followers || 0}
          userFollowing={publicProfileData?.userMetadata?.following || 0}
          userName={publicProfileData?.userName || t('NoInfo')}
          userPublications={publicProfileData?.userMetadata?.publications || 0}
        />
        {publicProfileData && <PublicProfilePosts id={publicProfileData?.id} />}
      </>
    );
  }
}
