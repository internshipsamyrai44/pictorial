'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

import { ProfileDashboard } from '@/widgets/profile-dashboard/ProfileDashboard';
import { Button, LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';
import ProfilePosts from '@/features/posts/ui/posts/ProfilePosts';
import { PATH } from '@/shared/const/PATH';

import { useGetProfileQuery, useGetUserByUserNameQuery } from '@/features/profile/api/profileApi';
import { useMeQuery } from '@/features/auth/api/authApi';
import { useGetPublicUserProfileQuery } from '@/features/profile/api/publicProfileApi';
import { PublicProfilePosts } from '@/features/public-posts/ui/publicProfilePosts/PublicProfilePosts';

type ProfileProps = {
  id: string;
};

export default function Profile({ id }: ProfileProps) {
  const t = useTranslations('Profile');

  const profileUserId = id;
  const profileUserIdNumber = Number(profileUserId);

  const { data: meData, isLoading: isMeLoading } = useMeQuery();
  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery();

  const isMyProfile = meData?.userId === profileUserIdNumber;
  const shouldFetchUserData = isMyProfile && !!profileData?.userName;

  const { data: userData } = useGetUserByUserNameQuery(profileData?.userName ?? '', {
    skip: !shouldFetchUserData
  });

  const { data: publicProfileData } = useGetPublicUserProfileQuery(profileUserId, {
    skip: isMyProfile || !profileUserId
  });
  console.log('publicProfileData', publicProfileData);

  if (isMeLoading || isProfileLoading) {
    return <LoaderLinear />;
  }

  const renderPrivateProfile = () => {
    if (!profileData) return null;

    return (
      <>
        <ProfileDashboard
          about={profileData.aboutMe || t('NoInfo')}
          avatar={profileData.avatars?.[0]?.url}
          userFollowers={userData?.followersCount || 0}
          userFollowing={userData?.followingCount || 0}
          userName={profileData.userName || t('NoInfo')}
          userPublications={userData?.publicationsCount || 0}
          isMyProfile={isMyProfile}
        >
          <Button variant="secondary">
            <Link href={PATH.PROFILE.SETTINGS}>{t('ProfileSettings')}</Link>
          </Button>
        </ProfileDashboard>

        <ProfilePosts userName={profileData.userName} isMyProfile={isMyProfile} />
      </>
    );
  };

  const renderPublicProfile = () => {
    if (!publicProfileData) return null;

    const { aboutMe, avatars, userMetadata, userName, id } = publicProfileData;

    return (
      <>
        <ProfileDashboard
          about={aboutMe || t('NoInfo')}
          avatar={avatars?.[0]?.url}
          userFollowers={userMetadata?.followers || 0}
          userFollowing={userMetadata?.following || 0}
          userName={userName || t('NoInfo')}
          userPublications={userMetadata?.publications || 0}
          isMyProfile={isMyProfile}
        />
        <PublicProfilePosts id={id} />
      </>
    );
  };

  return <>{isMyProfile ? renderPrivateProfile() : renderPublicProfile()}</>;
}
