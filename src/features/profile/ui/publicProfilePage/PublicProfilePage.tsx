'use client';

import s from './PublicProfilePage.module.scss';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import Image from 'next/image';
import { useGetPublicUserProfileQuery } from '@/features/profile/api/publicProfileApi';
import emptyAvatar from '@/public/images/emptyAvatar.jpg';

export const PublicProfilePage = () => {
  const { data } = useGetPublicUserProfileQuery(1);

  console.log(data);

  return (
    <div className={s.container}>
      <div className={s.profile}>
        <Image src={emptyAvatar} priority={true} width={200} height={200} alt={'Avatar image'} />
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
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium assumenda at autem beatae doloremque
            dolores ducimus esse fugiat id magni minima molestias, mollitia nam neque nihil numquam officiis placeat
            rerum?
          </div>
        </div>
      </div>
      <div className={s.images}>Pictures</div>
    </div>
  );
};
