'use client';

import TimeAgo from 'react-timeago';
import s from './PublicPostsPage.module.scss';
import { useGetPublicUserPostQuery } from '@/features/public-posts/api/publicPostApi';
import UsersCounter from '@/features/public-posts/ui/usersCounter/UsersCounter';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';

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
                <Button className={s.button}>{item.userName}</Button>
                <TimeAgo date={item.createdAt} />
                <p className={s.description}>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
