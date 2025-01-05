'use client';

import s from './PublicProfilePage.module.scss';
import { Alertpopup, Button, LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';
import Image from 'next/image';
import { useGetPublicUserProfileQuery } from '@/features/profile/api/publicProfileApi';
import emptyAvatar from '@/public/images/emptyAvatar.jpg';
import { useParams } from 'next/navigation';
import { useRequestError } from '@/shared/hooks/useRequestError';

export const PublicProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetPublicUserProfileQuery(+id);
  const errorMessage = useRequestError(error);

  if (!data) return <LoaderLinear />;

  console.log(isLoading);

  return (
    <>
      {errorMessage && <Alertpopup alertType={'error'} message={errorMessage} />}
      <div className={s.container}>
        <div className={s.profile}>
          <Image
            className={s.avatar}
            loader={() => data?.avatars[0].url || ''}
            src={data?.avatars[0]?.url || emptyAvatar}
            priority={true}
            width={0}
            height={0}
            alt={'Avatar image'}
            unoptimized={true}
          />
          <div className={s.content}>
            <div className={s.info}>
              <div className={s.name}>{data?.userName}</div>
              <div className={s.buttons}>
                <Button>Follow</Button> {/*TODO follow logic*/}
                <Button variant={'secondary'}>Send Message</Button> {/*TODO send message logic*/}
              </div>
            </div>
            <div className={s.statistic}>
              <div>
                <div>{data?.userMetadata.following}</div>
                <span>Following</span>
              </div>
              <div>
                <div>{data?.userMetadata.followers}</div>
                <span>Followers</span>
              </div>
              <div>
                <div>{data?.userMetadata.publications}</div>
                <span>Publications</span>
              </div>
            </div>
            <div>{data?.aboutMe}</div>
          </div>
        </div>
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
      </div>
    </>
  );
};
