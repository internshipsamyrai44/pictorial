'use client';

import s from './Home.module.scss';
import { useTranslations } from 'next-intl';
import { FeedPosts } from '@/features/posts/ui/posts/FeedPosts/FeedPosts';
import { useMeQuery } from '@/features/auth/api/authApi';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader } from '@/shared/ui/loader/Loader';

const Home = () => {
  const t = useTranslations('HomePage');
  const router = useRouter();

  // Проверяем, авторизован ли пользователь
  const { data: me, isLoading } = useMeQuery();

  useEffect(() => {
    // Если запрос завершен и пользователь не авторизован, редиректим на страницу входа
    if (!isLoading && !me?.userId) {
      router.push('/auth/login');
    }
  }, [me, isLoading, router]);

  // Показываем загрузку, пока проверяем авторизацию
  if (isLoading) {
    return (
      <div className={s.loadingContainer}>
        <Loader />
      </div>
    );
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
