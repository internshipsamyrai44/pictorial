import { useState, useEffect, useCallback } from 'react';
import { LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import {
  useLogoutFromDeviceMutation,
  useTerminateAllOtherDevicesMutation,
  useGetDevicesQuery
} from '@/features/profile/api/devicesApi';
import { useLogoutMutation, useMeQuery } from '@/features/auth/api/authApi';
import { PATH } from '@/shared/const/PATH';
import { CurrentDevice } from './current-device/CurrentDevice';
import { ActiveSessions } from './active-sessions/ActiveSessions';
import { TerminateSessionsButton } from './terminate-sessions-button/TerminateSessionsButton';
import { LogoutModal } from './logout-modal/LogoutModal';
import { deleteCookie } from '@/shared/utils/cookieUtils';
import s from './Devices.module.scss';

// Константы
const REFRESH_INTERVAL = 10000; // 10 секунд
const UNAUTHORIZED_STATUSES = [401, 400];

// Типизированная функция для проверки ошибок авторизации
const isAuthError = (error: any): boolean => {
  if (!error) return false;

  // Проверка статуса ошибки
  if ('status' in error) {
    return UNAUTHORIZED_STATUSES.includes(error.status) || error.status === 'FETCH_ERROR';
  }

  // Проверка оригинального статуса
  if ('originalStatus' in error) {
    return UNAUTHORIZED_STATUSES.includes(error.originalStatus);
  }

  // Проверка статуса в данных ошибки
  if ('data' in error && error.data && typeof error.data === 'object' && 'statusCode' in error.data) {
    return UNAUTHORIZED_STATUSES.includes(error.data.statusCode);
  }

  return false;
};

export const Devices = () => {
  const t = useTranslations('Sessions');
  const router = useRouter();

  // Состояния компонента
  const [isClient, setIsClient] = useState(false);
  const [isLogoutModalActive, setIsLogoutModalActive] = useState(false);

  // API хуки
  const {
    data: devicesData,
    isLoading,
    error,
    refetch
  } = useGetDevicesQuery(undefined, {
    skip: !isClient
  });
  const { data: me } = useMeQuery(undefined, {
    skip: !isClient
  });
  const [logoutFromDevice, { isLoading: isLogoutLoading }] = useLogoutFromDeviceMutation();
  const [logout, { isLoading: isGlobalLogoutLoading }] = useLogoutMutation();
  const [terminateAllOtherDevices, { isLoading: isTerminateAllLoading }] = useTerminateAllOtherDevicesMutation();

  // Вычисляемые значения
  const hasOtherDevices = Boolean(devicesData?.others && devicesData.others.length > 0);
  const isAnyLoading = isLogoutLoading || isGlobalLogoutLoading;

  // Инициализация клиента
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Обработка ошибок авторизации
  useEffect(() => {
    if (error && isClient && isAuthError(error)) {
      console.log('Unauthorized error detected, redirecting to login');
      deleteCookie('accessToken');
      router.push(PATH.AUTH.LOGIN);
    }
  }, [error, router, isClient]);

  // Периодическое обновление данных
  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      if (!isLoading && !error) {
        refetch();
      }
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [isLoading, error, refetch, isClient]);

  // Функция форматирования даты
  const formatDate = useCallback(
    (dateString: string): string => {
      return isClient
        ? new Date(dateString).toLocaleString()
        : new Date(dateString).toISOString().replace('T', ' ').substring(0, 19);
    },
    [isClient]
  );

  // Обработчик выхода с устройства
  const handleLogoutFromDevice = useCallback(
    async (deviceId: number) => {
      // Если это текущее устройство, показываем модальное окно подтверждения
      if (devicesData?.current && devicesData.current.deviceId === deviceId) {
        setIsLogoutModalActive(true);
        return;
      }

      // Выход с другого устройства
      try {
        await logoutFromDevice(deviceId.toString()).unwrap();
      } catch (error) {
        console.error('Failed to logout from device:', error);
      }
    },
    [devicesData, logoutFromDevice]
  );

  // Обработчик глобального выхода
  const handleGlobalLogout = useCallback(() => {
    logout()
      .unwrap()
      .then(() => {
        setIsLogoutModalActive(false);
        router.push(PATH.MAIN);
      })
      .catch((error) => {
        console.error('Logout failed: ', error);
      });
  }, [logout, router]);

  // Обработчик завершения всех других сессий
  const handleTerminateAllOtherDevices = useCallback(async () => {
    try {
      await terminateAllOtherDevices().unwrap();
    } catch (error) {
      console.error('Failed to terminate all other devices:', error);
    }
  }, [terminateAllOtherDevices]);

  // Обработчик закрытия модального окна
  const handleCloseModal = useCallback(() => {
    setIsLogoutModalActive(false);
  }, []);

  // Состояние загрузки
  if (!isClient || isLoading) {
    return <LoaderLinear />;
  }

  // Обработка ошибок
  if (error) {
    if (isAuthError(error)) {
      return <LoaderLinear />;
    }
    return <div>{t('ErrorLoadingSessions')}</div>;
  }

  // Основной рендер
  return (
    <div className={s.container}>
      {/* Текущее устройство */}
      {devicesData?.current && (
        <CurrentDevice device={devicesData.current} onLogout={handleLogoutFromDevice} isLoading={isAnyLoading} />
      )}

      {/* Кнопка завершения всех других сессий */}
      <TerminateSessionsButton
        onTerminateAll={handleTerminateAllOtherDevices}
        isLoading={isTerminateAllLoading}
        hasOtherDevices={hasOtherDevices}
      />

      {/* Активные сессии */}
      <ActiveSessions
        devices={devicesData?.others || []}
        onLogout={handleLogoutFromDevice}
        isLoading={isAnyLoading}
        formatDate={formatDate}
      />

      {/* Модальное окно подтверждения выхода */}
      <LogoutModal
        isOpen={isLogoutModalActive}
        onClose={handleCloseModal}
        onConfirm={handleGlobalLogout}
        isLoading={isGlobalLogoutLoading}
        userEmail={me?.email}
      />
    </div>
  );
};
