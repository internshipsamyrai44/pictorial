'use client';

import s from './Home.module.scss';
import { useTranslations } from 'next-intl';
import { FeedPosts } from '@/features/posts/ui/posts/FeedPosts/FeedPosts';
import { useMeQuery } from '@/features/auth/api/authApi';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader } from '@/shared/ui/loader/Loader';

const Home = () => {
  const t = useTranslations('HomePage');
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Проверяем, авторизован ли пользователь только на клиенте
  const { data: me, isLoading } = useMeQuery(undefined, {
    skip: !isClient
  });

  useEffect(() => {
    // Если запрос завершен и пользователь не авторизован, редиректим на страницу входа
    if (isClient && !isLoading && !me?.userId) {
      router.push('/auth/login');
    }
  }, [me, isLoading, router, isClient]);

  // Показываем загрузку, пока не инициализирован клиент или проверяем авторизацию
  if (!isClient || isLoading) {
    return (
      <div className={s.loadingContainer}>
        <Loader />
      </div>
    );
  }

  // Если пользователь не авторизован, ничего не показываем (будет редирект)
  if (!me?.userId) {
    return null;
  }

  // Если пользователь авторизован, показываем ленту
  return (
    <div className={s.container}>
      <div className={s.home}>
        <h2 className={s.title}>{t('title')}</h2>
        <FeedPosts />
      </div>
    </div>
  );
};

export default Home;
