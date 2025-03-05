'use client';

import * as React from 'react';
import { useGetProfileQuery, useGetUserByUserNameQuery } from '@/features/profile/api/profileApi';
import { ProfileDashboard } from '@/widgets/profile-dashboard/ProfileDashboard';
import { Button, LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';
import Link from 'next/link';
import { PATH } from '@/shared/const/PATH';
import { useTranslations } from 'next-intl';
import ProfilePosts from '@/features/posts/ui/posts/ProfilePosts';
import { useGetPublicUserProfileQuery } from '@/features/profile/api/publicProfileApi';
import { useParams } from 'next/navigation';
import { RootState } from '@/app/store/store';
import { useSelector } from 'react-redux';

// export default function Profile() {
//   const t = useTranslations('Profile');
//   const isAuth = useSelector((state: RootState) => state.auth.isAuth);
//   const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery();
//   const { data: userData, isLoading: isUserDataLoading } = useGetUserByUserNameQuery(profileData?.userName ?? '', {
//     skip: !profileData
//   });
//   const { id } = useParams<{ id: string }>();
//   const { data: publicProfileData, isLoading: isPublicProfileLoading } = useGetPublicUserProfileQuery(+id);
//
//   if (isProfileLoading || isUserDataLoading) {
//     return <LoaderLinear />;
//   }
//
//   return (
//     <>
//       <ProfileDashboard
//         about={profileData?.aboutMe || t('NoInfo')}
//         avatar={profileData?.avatars[0]?.url}
//         userFollowers={userData?.followersCount || 0}
//         userFollowing={userData?.followingCount || 0}
//         userName={profileData?.userName || t('NoInfo')}
//         userPublications={userData?.publicationsCount || 0}
//       >
//         <Button variant={'secondary'}>
//           <Link href={PATH.PROFILE.SETTINGS}>{t('ProfileSettings')}</Link>
//         </Button>
//       </ProfileDashboard>
//       {profileData && <ProfilePosts userName={profileData.userName} />}
//     </>
//   );
// }

export default function Profile() {
  const t = useTranslations('Profile');
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  // Запросы для авторизованного пользователя:
  const { data: profileData, isLoading: isProfileLoading } = useGetProfileQuery();
  const { data: userData, isLoading: isUserDataLoading } = useGetUserByUserNameQuery(profileData?.userName ?? '', {
    skip: !profileData
  });

  // Запрос для публичного профиля (когда пользователь не авторизован)
  const { id } = useParams<{ id: string }>();
  const { data: publicProfileData, isLoading: isPublicProfileLoading } = useGetPublicUserProfileQuery(+id);

  // Если авторизован
  if (isAuth) {
    if (isProfileLoading || isUserDataLoading) {
      return <LoaderLinear />;
    }
    return (
      <>
        <ProfileDashboard
          about={profileData?.aboutMe || t('NoInfo')}
          avatar={profileData?.avatars[0]?.url}
          userFollowers={userData?.followersCount || 0}
          userFollowing={userData?.followingCount || 0}
          userName={profileData?.userName || t('NoInfo')}
          userPublications={userData?.publicationsCount || 0}
        >
          <Button variant="secondary">
            <Link href={PATH.PROFILE.SETTINGS}>{t('ProfileSettings')}</Link>
          </Button>
        </ProfileDashboard>
        {profileData && <ProfilePosts userName={profileData.userName} />}
      </>
    );
  } else {
    // Если не авторизован, используем публичные данные
    if (isPublicProfileLoading) {
      return <LoaderLinear />;
    }
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
        {publicProfileData && <ProfilePosts userName={publicProfileData.userName} />}
      </>
    );
  }
}
