'use client';

import s from './PublicPostsPage.module.scss';
import { useGetPublicUserPostQuery } from '@/features/public-posts/api/publicPostApi';

export default function PublicPostsPage() {
  const { data, isLoading, isError } = useGetPublicUserPostQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data) {
    return null;
  }

  console.log(data);

  return (
    <div className={s.container}>
      <section className={s.section}>
        <span className={s.userStats}>Registered users: {data.totalUsers}</span>
      </section>
      <section>
        <ul className={s.postList}>
          {data.items.map((item) => (
            <li key={item.id} className={s.postItem}>
              <div className={s.imageWrapper}>
                <img className={s.image} src={item.images[0]?.url} alt={item.description} />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
