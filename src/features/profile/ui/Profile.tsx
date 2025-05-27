'use client';

import { LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';
import { useProfileData } from '@/features/profile/hooks/useProfileData';
import { PrivateProfile } from '@/features/profile/ui/private-profile/PrivateProfile';
import { PublicProfile } from '@/features/profile/ui/public-profile/PublicProfile';

type ProfileProps = {
  id: string;
};

export default function Profile({ id }: ProfileProps) {
  const { isMyProfile, profileData, publicProfileData, isLoading } = useProfileData({ id });

  if (isLoading) {
    return <LoaderLinear />;
  }

  return isMyProfile ? (
    <PrivateProfile isMyProfile={isMyProfile} profileData={profileData} />
  ) : (
    <PublicProfile publicProfileData={publicProfileData} />
  );
}
