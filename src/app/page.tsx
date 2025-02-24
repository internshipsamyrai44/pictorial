'use client';

import { useEffect } from 'react';
import { PATH } from '@/shared/const/PATH';
import { useMeQuery } from '@/features/auth/api/authApi';
import { useRouter } from 'next/navigation';
import { LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';

export default function IndexPage() {
  const { data: me, error, isLoading } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!me?.userId) {
      router.replace(PATH.PUBLIC.PUBLIC_PAGE);
      return;
    }

    router.replace(PATH.HOME);
  }, [isLoading, error, me, router]);

  if (isLoading) {
    return <LoaderLinear />;
  }

  if (error) {
    const errorMessage = 'message' in error && error.message ? error.message : JSON.stringify(error);
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          padding: '1rem',
          textAlign: 'center'
        }}
      >
        <h2>Произошла ошибка</h2>
        <p>{errorMessage || 'Не удалось загрузить данные пользователя.'}</p>
      </div>
    );
  }

  return <LoaderLinear />;
}
