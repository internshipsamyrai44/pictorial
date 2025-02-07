'use client';

import s from './PublicPostsPage.module.scss';
import { useGetPublicUserPostQuery } from '@/features/public-posts/api/publicPostApi';
import UsersCounter from '@/features/public-posts/ui/usersCounter/UsersCounter';
import PostItem from '@/features/public-posts/ui/publicPost/PublicPost';

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
            <PostItem key={item.id} item={item} />
          ))}
        </ul>
      </section>
    </div>
  );
}
