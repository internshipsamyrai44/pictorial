import { ProfileDashboard } from '@/widgets/profile-dashboard/ProfileDashboard';
import { PublicProfilePosts } from '@/features/public-posts/ui/publicProfilePosts/PublicProfilePosts';
import { PublicUserProfileByIdResponse } from '@/features/profile/model/publicProfileApi.types';
import { LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';

type Props = {
  publicProfileData?: PublicUserProfileByIdResponse;
};

export const PublicProfile = ({ publicProfileData }: Props) => {
  if (!publicProfileData) {
    return <LoaderLinear />;
  }

  const { userName, id } = publicProfileData;

  return (
    <>
      <ProfileDashboard userName={userName} publicProfileData={publicProfileData} />
      <PublicProfilePosts id={id} />
    </>
  );
};
