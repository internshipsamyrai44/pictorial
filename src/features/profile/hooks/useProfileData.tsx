import { useMeQuery } from '@/features/auth/api/authApi';
import { useGetProfileQuery } from '@/features/profile/api/profileApi';
import { useGetPublicUserProfileQuery } from '@/features/profile/api/publicProfileApi';
import { useEffect, useState } from 'react';

type Props = {
  id: string;
};

export const useProfileData = ({ id }: Props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data: meData, isLoading: isMeLoading } = useMeQuery(undefined, {
    skip: !isClient
  });
  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery(undefined, {
    skip: !isClient
  });
  const isMyProfile = meData?.userId === Number(id);

  const { data: publicProfileData, isLoading: isPublicProfileLoading } = useGetPublicUserProfileQuery(id as string, {
    skip: isMyProfile || !isClient
  });
  return {
    isMyProfile,
    profileData,
    publicProfileData,
    isLoading: isMeLoading || isProfileLoading || isPublicProfileLoading
  };
};
