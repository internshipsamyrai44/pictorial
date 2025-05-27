import { useMeQuery } from '@/features/auth/api/authApi';
import { useGetProfileQuery } from '@/features/profile/api/profileApi';
import { useGetPublicUserProfileQuery } from '@/features/profile/api/publicProfileApi';

type Props = {
  id: string;
};

export const useProfileData = ({ id }: Props) => {
  const { data: meData, isLoading: isMeLoading } = useMeQuery();
  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery();
  const isMyProfile = meData?.userId === Number(id);

  const { data: publicProfileData, isLoading: isPublicProfileLoading } = useGetPublicUserProfileQuery(id as string, {
    skip: isMyProfile
  });
  return {
    isMyProfile,
    profileData,
    publicProfileData,
    isLoading: isMeLoading || isProfileLoading || isPublicProfileLoading
  };
};
