// 'use server';
//
// import { ProfileDashboard } from '@/widgets/profile-dashboard/ProfileDashboard';
// import { PublicProfilePosts } from '@/features/public-posts/ui/publicProfilePosts/PublicProfilePosts';
// import { baseUrl } from '@/shared/const/baseApi';
// import { cookies } from 'next/headers';
//
// export default async function PublicProfile({ id }: { id: string }) {
//   let publicProfileData;
//
//   try {
//     const cookieStore = await cookies();
//     const accessToken = cookieStore.get('accessToken')?.value;
//     const refreshToken = cookieStore.get('refreshToken')?.value;
//
//     publicProfileData = await fetch(new URL(`v1/public-user/profile/${id}`, baseUrl), {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         'X-Refresh-Token': refreshToken || ''
//       }
//     }).then((res) => res.json());
//   } catch (error) {
//     console.log(error);
//   }
//
//   return (
//     <>
//       <ProfileDashboard
//         about={publicProfileData?.aboutMe || ''}
//         avatar={publicProfileData?.avatars[0]?.url}
//         userFollowers={publicProfileData?.userMetadata?.followers || 0}
//         userFollowing={publicProfileData?.userMetadata?.following || 0}
//         userName={publicProfileData?.userName || ''}
//         userPublications={publicProfileData?.userMetadata?.publications || 0}
//       />
//       {publicProfileData && <PublicProfilePosts id={publicProfileData?.id} />}
//     </>
//   );
// }
