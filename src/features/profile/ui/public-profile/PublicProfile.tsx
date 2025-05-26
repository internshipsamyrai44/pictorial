import { ProfileDashboard } from '@/widgets/profile-dashboard/ProfileDashboard';
import { PublicProfilePosts } from '@/features/public-posts/ui/publicProfilePosts/PublicProfilePosts';
import { PublicUserProfileByIdResponse } from '@/features/profile/model/publicProfileApi.types';

type Props = {
  publicProfileData?: PublicUserProfileByIdResponse;
};

export const PublicProfile = ({ publicProfileData }: Props) => {
  if (!publicProfileData) {
    return null;
  }
  const { userName, id } = publicProfileData;

  return (
    <>
      <ProfileDashboard userName={userName} isMyProfile={false} />
      <PublicProfilePosts id={id} />
    </>
  );
};
