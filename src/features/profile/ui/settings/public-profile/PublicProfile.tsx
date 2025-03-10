'use client';

import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useGetPublicUserProfileQuery } from '@/features/profile/api/publicProfileApi';
import { ProfileDashboard } from '@/widgets/profile-dashboard/ProfileDashboard';
import { PublicProfilePosts } from '@/features/public-posts/ui/publicProfilePosts/PublicProfilePosts';

export default function PublicProfile() {
  const t = useTranslations('Profile');
  const { id } = useParams<{ id: string }>();

  const { data: publicProfileData } = useGetPublicUserProfileQuery(Number(id));

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
