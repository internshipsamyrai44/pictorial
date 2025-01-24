'use client';

import TimeAgo from 'react-timeago';
import s from './PublicPostsPage.module.scss';
import { useGetPublicUserPostQuery } from '@/features/public-posts/api/publicPostApi';
import { Card } from '@internshipsamyrai44-ui-kit/components-lib';

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

  const totalUsersArr = data.totalUsers.toString().padStart(6, '0').split('');

  return (
    <div className={s.container}>
      <section className={s.section}>
        <Card className={s.card}>
          <span className={s.userStats}>
            Registered users:
            <Card className={s.unitContainer}>
              {totalUsersArr.map((unit, index) => {
                return (
                  <div className={s.unitContainer} key={index}>
                    <span className={s.unit}>{unit}</span>
                  </div>
                );
              })}
            </Card>
          </span>
        </Card>
      </section>
      <section>
        <ul className={s.postList}>
          {data.items.map((item) => (
            <li key={item.id} className={s.postItem}>
              <div className={s.imageWrapper}>
                <img className={s.image} src={item.images[0]?.url} alt={item.description} />
                <TimeAgo date={item.createdAt} />
              </div>
            </li>
          ))}
        </ul>
      </section>
      ;
    </div>
  );
}
