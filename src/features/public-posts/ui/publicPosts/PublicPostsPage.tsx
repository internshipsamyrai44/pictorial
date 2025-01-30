'use client';

import TimeAgo from 'react-timeago';
import s from './PublicPostsPage.module.scss';
import { useGetPublicUserPostQuery } from '@/features/public-posts/api/publicPostApi';
import UsersCounter from '@/features/public-posts/ui/usersCounter/UsersCounter';
import { ShowMoreButton } from '@/features/public-posts/ui/ShowMoreButton';
import Link from 'next/link';

export default function PublicPostsPage() {
  const { data, isLoading, isError } = useGetPublicUserPostQuery({ pageSize: 4 });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className={s.container}>
      <section className={s.section}>
        <UsersCounter totalUsers={data.totalUsers} />
      </section>
      <section>
        <ul className={s.postList}>
          {data.items.map((item) => (
            <li key={item.id} className={s.postItem}>
              <div className={s.imageWrapper}>
                <img className={s.image} src={item.images[0]?.url} alt={item.description} />
                {/*ДОПИСАТЬ РОУТЫ В ЛИНКУ*/}
                <Link className={s.userLink} href={`${'/' + item.ownerId}`}>
                  <div className={s.userAvatarLink}>
                    <img src={item.avatarOwner ?? '/images/noAvatar.png'} alt={'avatar'} className={s.userAvatar} />
                    <h3 className={s.userName}>{item.userName} </h3>
                  </div>
                </Link>
                <TimeAgo className={s.time} date={item.createdAt} />
                <div className={s.description}>
                  <ShowMoreButton maxLength={70} text={item.description} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
