'use client';

import { GeneralHeader } from '@/widgets/general-header/GeneralHeader';
import { SideNavPanel } from '@/widgets/side-nav-panel/SideNavPanel';
import { ReactNode, useEffect, useState } from 'react';
import { useGetDevicesQuery } from '@/features/profile/api/devicesApi';
import { useLogoutMutation } from '@/features/auth/api/authApi';
import { useRouter } from 'next/navigation';
import { PATH } from '@/shared/const/PATH';
import { deleteCookie } from '@/shared/utils/cookieUtils';
import { LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './AuthorizedLayout.module.scss';

type Props = {
  children: ReactNode;
};

export const AuthorizedLayout = ({ children }: Props) => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [logout] = useLogoutMutation();

  // Устанавливаем флаг клиентского рендеринга
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Получаем информацию об устройствах
  const { data: devicesData, error } = useGetDevicesQuery(undefined, {
    skip: !isClient
  });

  // Обработка ошибок и проверка сессии
  useEffect(() => {
    if (!isClient) return;

    const handleSessionError = () => {
      console.log('Session error detected, redirecting to login');
      deleteCookie('accessToken');
      router.push(PATH.AUTH.LOGIN);
    };

    // Проверка на ошибки авторизации
    if (error) {
      const isUnauthorized =
        ('status' in error && (error.status === 401 || error.status === 400 || error.status === 'FETCH_ERROR')) ||
        ('originalStatus' in error && (error.originalStatus === 401 || error.originalStatus === 400)) ||
        ('data' in error &&
          error.data &&
          typeof error.data === 'object' &&
          'statusCode' in error.data &&
          (error.data.statusCode === 401 || error.data.statusCode === 400));

      if (isUnauthorized) {
        handleSessionError();
      }
    }

    // Проверка на отсутствие текущего устройства в данных сессии
    if (devicesData && !devicesData.current) {
      logout()
        .unwrap()
        .catch(() => {})
        .finally(() => {
          handleSessionError();
        });
    }
  }, [devicesData, error, isClient, logout, router]);

  // Показываем загрузку, пока не получим данные на клиенте
  if (!isClient) {
    return <LoaderLinear />;
  }

  return (
    <div className={s.layoutContainer}>
      <GeneralHeader isPublic={false} />
      <main className={s.contentContainer}>
        <SideNavPanel className={s.sidebar} />
        <div className={s.content}>{children}</div>
      </main>
    </div>
  );
};
