import { ProfileDashboard } from '@/widgets/profile-dashboard/ProfileDashboard';
import ProfilePosts from '@/features/posts/ui/posts/ProfilePosts';
import { Profile } from '@/features/profile/model/profileApi.types';
import { useTranslations } from 'next-intl';

type Props = {
  profileData?: Profile;
  isMyProfile: boolean;
};
export const PrivateProfile = ({ profileData, isMyProfile }: Props) => {
  const t = useTranslations('Profile');

  return (
    <>
      <ProfileDashboard userName={profileData?.userName || t('NoInfo')} isMyProfile={isMyProfile} />
      <ProfilePosts userName={profileData?.userName || t('NoInfo')} isMyProfile={isMyProfile} />
    </>
  );
};
