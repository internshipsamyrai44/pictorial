'use client';

import s from './PublicPostsPage.module.scss';
import { useGetPublicUserPostQuery } from '@/features/public-posts/api/publicPostApi';
import UsersCounter from '@/features/public-posts/ui/usersCounter/UsersCounter';
import PostItem from '@/features/public-posts/ui/publicPost/PublicPost';
import { useEffect } from 'react';
import { useMeQuery } from '@/features/auth/api/authApi';
import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/const/PATH';
import { LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';

export default function PublicPostsPage() {
  const router = useRouter();

  // Запрос информации о пользователе
  const { data: me, isLoading: meLoading } = useMeQuery();

  // Запрос публичных постов
  const { data, isLoading, isError } = useGetPublicUserPostQuery({ pageSize: 4 });

  useEffect(() => {
    // Если запрос me завершился и пользователь аутентифицирован, редиректим на HOME
    if (!meLoading && me?.userId) {
      router.push(PATH.HOME);
    }
  }, [me, meLoading, router]);

  // Показываем загрузку, пока идет загрузка данных пользователя или постов
  if (meLoading || isLoading) {
    return <LoaderLinear />;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className={s.container}>
      <UsersCounter totalUsers={data.totalUsers} />
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
