import { useMeQuery } from '@/features/auth/api/authApi';
import { useGetProfileQuery } from '@/features/profile/api/profileApi';
import { useGetPublicUserProfileQuery } from '@/features/profile/api/publicProfileApi';
import { useGetUserProfileByUsernameQuery } from '@/features/search/api/searchApi';

type Props = {
  id?: string;
  userName?: string;
};

export const useProfileData = ({ id, userName }: Props) => {
  const { data: meData, isLoading: isMeLoading } = useMeQuery();
  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery();
  const isMyProfile = meData?.userId === Number(id);

  const { data: publicProfileData } = useGetPublicUserProfileQuery(id as string, {
    skip: isMyProfile
  });

  const { data: userData, refetch } = useGetUserProfileByUsernameQuery(userName as string);

  return {
    isMyProfile,
    profileData: profileData,
    publicProfileData,
    isLoading: isMeLoading || isProfileLoading,
    userData,
    refetch
  };
};
