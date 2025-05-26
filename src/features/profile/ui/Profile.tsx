'use client';

import { ProfileDashboard } from '@/widgets/profile-dashboard/ProfileDashboard';
import { LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';
import ProfilePosts from '@/features/posts/ui/posts/ProfilePosts';

import { useGetProfileQuery } from '@/features/profile/api/profileApi';
import { useMeQuery } from '@/features/auth/api/authApi';
import { useGetPublicUserProfileQuery } from '@/features/profile/api/publicProfileApi';
import { PublicProfilePosts } from '@/features/public-posts/ui/publicProfilePosts/PublicProfilePosts';

type ProfileProps = {
  id: string;
};

export default function Profile({ id }: ProfileProps) {
  const profileUserId = id;
  const profileUserIdNumber = Number(profileUserId);

  const { data: meData, isLoading: isMeLoading } = useMeQuery();
  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery();

  const isMyProfile = meData?.userId === profileUserIdNumber;

  const { data: publicProfileData } = useGetPublicUserProfileQuery(profileUserId, {
    skip: isMyProfile || !profileUserId
  });

  if (isMeLoading || isProfileLoading) {
    return <LoaderLinear />;
  }

  const renderPrivateProfile = () => {
    if (!profileData) return null;

    return (
      <>
        <ProfileDashboard userName={profileData.userName} isMyProfile={isMyProfile} />

        <ProfilePosts userName={profileData.userName} isMyProfile={isMyProfile} />
      </>
    );
  };

  const renderPublicProfile = () => {
    if (!publicProfileData) return null;

    const { userName, id } = publicProfileData;
    return (
      <>
        <ProfileDashboard userName={userName} isMyProfile={isMyProfile} />
        <PublicProfilePosts id={id} />
      </>
    );
  };

  return <>{isMyProfile ? renderPrivateProfile() : renderPublicProfile()}</>;
}
