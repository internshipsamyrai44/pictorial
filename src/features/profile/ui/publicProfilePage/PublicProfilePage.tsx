'use client';

import s from './PublicProfilePage.module.scss';
import { Alertpopup, Button, LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';
import Image from 'next/image';
import { useGetPublicUserProfileQuery } from '@/features/profile/api/publicProfileApi';
import { useParams } from 'next/navigation';
import { useRequestError } from '@/shared/hooks/useRequestError';
import { ProfileDashboard } from '@/widgets/profile-dashboard/ProfileDashboard';

export const PublicProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error, isFetching } = useGetPublicUserProfileQuery(+id);
  const errorMessage = useRequestError(error);

  if (isFetching) return <LoaderLinear />;

  return (
    <>
      {errorMessage && <Alertpopup alertType={'error'} message={errorMessage} />}
      <ProfileDashboard
        avatar={data?.avatars[0]?.url}
        userFollowers={data?.userMetadata.followers || 0}
        userFollowing={data?.userMetadata.following || 0}
        userName={data?.userName || 'no info'}
        userPublications={data?.userMetadata.publications || 0}
      >
        <div className={s.buttons}>
          <Button>Follow</Button> {/*TODO follow logic*/}
          <Button variant={'secondary'}>Send Message</Button> {/*TODO send message logic*/}
        </div>
      </ProfileDashboard>
      <div className={s.images}>
        {data?.avatars.map((el, index) => (
          <Image
            className={s.image}
            loader={() => el.url}
            height={0}
            width={0}
            key={index}
            src={el.url}
            alt={'Profile images'}
            unoptimized={true}
          />
        ))}
      </div>
    </>
  );
};
