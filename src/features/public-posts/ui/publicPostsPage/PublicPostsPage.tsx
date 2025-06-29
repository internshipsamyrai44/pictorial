'use client';

import s from './PublicPostsPage.module.scss';
import { useGetPublicAllPostsQuery } from '@/features/public-posts/api/publicPostApi';
import UsersCounter from '@/features/public-posts/ui/usersCounter/UsersCounter';
import PostItem from '@/features/public-posts/ui/publicPost/PublicPost';
import { useEffect, useState } from 'react';
import { useMeQuery } from '@/features/auth/api/authApi';
import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/const/PATH';
import { LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';

export default function PublicPostsPage() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Запрос информации о пользователе только на клиенте
  const { data: me, isLoading: meLoading } = useMeQuery(undefined, {
    skip: !isClient
  });

  // Запрос публичных постов только на клиенте
  const { data, isLoading, isError } = useGetPublicAllPostsQuery(
    { pageSize: 4 },
    {
      skip: !isClient
    }
  );

  useEffect(() => {
    // Если запрос me завершился и пользователь аутентифицирован, редиректим на HOME
    if (isClient && !meLoading && me?.userId) {
      router.push(PATH.HOME);
    }
  }, [me, meLoading, router, isClient]);

  // Показываем загрузку, пока не инициализирован клиент или идет загрузка данных
  if (!isClient || meLoading || isLoading) {
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
