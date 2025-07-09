import { useState, useEffect } from 'react';
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

export const Devices = () => {
  const t = useTranslations('Sessions');
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLogoutModalActive, setIsLogoutModalActive] = useState(false);
  const [isTerminateSessionModalActive, setIsTerminateSessionModalActive] = useState(false);
  const [isTerminateAllModalActive, setIsTerminateAllModalActive] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null);

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

  const hasOtherDevices = Boolean(devicesData?.others && devicesData.others.length > 0);
  const isAnyLoading = isLogoutLoading || isGlobalLogoutLoading;

  // Установка флага клиентского рендеринга
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Обработка ошибок авторизации
  useEffect(() => {
    if (!error || !isClient) return;

    console.log('Devices error:', error);

    const isUnauthorized =
      ('status' in error && (error.status === 401 || error.status === 400 || error.status === 'FETCH_ERROR')) ||
      ('originalStatus' in error && (error.originalStatus === 401 || error.originalStatus === 400)) ||
      ('data' in error &&
        error.data &&
        typeof error.data === 'object' &&
        'statusCode' in error.data &&
        (error.data.statusCode === 401 || error.data.statusCode === 400));

    if (isUnauthorized) {
      console.log('Unauthorized error detected, redirecting to login');
      deleteCookie('accessToken');
      router.push(PATH.AUTH.LOGIN);
    }
  }, [error, router, isClient]);

  // Периодическое обновление списка устройств
  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      if (!isLoading && !error) {
        refetch();
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isLoading, error, refetch, isClient]);

  // Форматирование даты с учетом клиентского рендеринга
  const formatDate = (dateString: string) => {
    if (!isClient) {
      return new Date(dateString).toISOString().replace('T', ' ').substring(0, 19);
    }
    return new Date(dateString).toLocaleString();
  };

  // Обработчик выхода из устройства
  const handleLogoutFromDevice = (deviceId: number) => {
    if (devicesData?.current && devicesData.current.deviceId === deviceId) {
      setIsLogoutModalActive(true);
      return;
    }

    setSelectedDeviceId(deviceId);
    setIsTerminateSessionModalActive(true);
  };

  // Подтверждение выхода из устройства
  const handleConfirmLogoutFromDevice = async () => {
    if (selectedDeviceId === null) return;

    try {
      await logoutFromDevice(selectedDeviceId.toString()).unwrap();
      setIsTerminateSessionModalActive(false);
      setSelectedDeviceId(null);
    } catch (error) {
      console.error('Failed to logout from device:', error);
    }
  };

  // Глобальный выход
  const handleGlobalLogout = () => {
    logout()
      .unwrap()
      .then(() => {
        setIsLogoutModalActive(false);
        router.push(PATH.MAIN);
      })
      .catch((error) => {
        console.error('Logout failed: ', error);
      });
  };

  // Завершение всех других сессий
  const handleTerminateAllOtherDevices = () => {
    setIsTerminateAllModalActive(true);
  };

  // Подтверждение завершения всех других сессий
  const handleConfirmTerminateAllOtherDevices = async () => {
    try {
      await terminateAllOtherDevices().unwrap();
      setIsTerminateAllModalActive(false);
    } catch (error) {
      console.error('Failed to terminate all other devices:', error);
    }
  };

  // Закрытие всех модальных окон
  const handleCloseModal = () => {
    setIsLogoutModalActive(false);
    setIsTerminateSessionModalActive(false);
    setIsTerminateAllModalActive(false);
    setSelectedDeviceId(null);
  };

  // Получение информации о выбранном устройстве
  const getSelectedDeviceInfo = () => {
    if (!selectedDeviceId || !devicesData?.others) return null;

    const device = devicesData.others.find((d) => d.deviceId === selectedDeviceId);
    return device || null;
  };

  // Состояния загрузки
  if (!isClient || isLoading) {
    return <LoaderLinear />;
  }

  // Обработка ошибок
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
      return <LoaderLinear />;
    }

    return <div>{t('ErrorLoadingSessions')}</div>;
  }

  const selectedDevice = getSelectedDeviceInfo();
  const deviceInfo = selectedDevice
    ? `${selectedDevice.browserName || selectedDevice.deviceName} (${selectedDevice.ip})`
    : '';

  return (
    <div className={s.container} data-testid="devices-container">
      {devicesData?.current && (
        <CurrentDevice device={devicesData.current} onLogout={handleLogoutFromDevice} isLoading={isAnyLoading} />
      )}

      <TerminateSessionsButton
        onTerminateAll={handleTerminateAllOtherDevices}
        isLoading={isTerminateAllLoading}
        hasOtherDevices={hasOtherDevices}
      />

      <ActiveSessions
        devices={devicesData?.others || []}
        onLogout={handleLogoutFromDevice}
        isLoading={isAnyLoading}
        formatDate={formatDate}
      />

      {/* Модальные окна */}
      <LogoutModal
        isOpen={isLogoutModalActive}
        onClose={handleCloseModal}
        onConfirm={handleGlobalLogout}
        isLoading={isGlobalLogoutLoading}
        userEmail={me?.email}
      />

      <LogoutModal
        isOpen={isTerminateSessionModalActive}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogoutFromDevice}
        isLoading={isLogoutLoading}
        title={t('TerminateSession')}
        message={t('TerminateSessionConfirmation')}
        deviceInfo={deviceInfo}
      />

      <LogoutModal
        isOpen={isTerminateAllModalActive}
        onClose={handleCloseModal}
        onConfirm={handleConfirmTerminateAllOtherDevices}
        isLoading={isTerminateAllLoading}
        title={t('TerminateAllSessions')}
        message={t('TerminateAllSessionsConfirmation')}
      />
    </div>
  );
};
