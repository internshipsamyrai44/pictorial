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

    // Если произошла ошибка или пользователь не аутентифицирован
    if (error || !me?.userId) {
      router.push(PATH.PUBLIC.PUBLIC_PAGE);
      return;
    }

    // Если пользователь аутентифицирован, перенаправляем на домашнюю страницу
    router.push(PATH.HOME);
  }, [isLoading, error, me, router]);

  return <LoaderLinear />;
}
