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
import s from './Devices.module.scss';

export const Devices = () => {
  const t = useTranslations('Sessions');
  const router = useRouter();

  const { data: devicesData, isLoading, error } = useGetDevicesQuery();
  const { data: me } = useMeQuery();
  const [logoutFromDevice, { isLoading: isLogoutLoading }] = useLogoutFromDeviceMutation();
  const [logout, { isLoading: isGlobalLogoutLoading }] = useLogoutMutation();
  const [terminateAllOtherDevices, { isLoading: isTerminateAllLoading }] = useTerminateAllOtherDevicesMutation();

  const [isClient, setIsClient] = useState(false);
  const [isLogoutModalActive, setIsLogoutModalActive] = useState(false);

  const hasOtherDevices = Boolean(devicesData?.others && devicesData.others.length > 0);
  const isAnyLoading = isLogoutLoading || isGlobalLogoutLoading;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formatDate = (dateString: string) => {
    if (!isClient) {
      return new Date(dateString).toISOString().replace('T', ' ').substring(0, 19);
    }
    return new Date(dateString).toLocaleString();
  };

  const handleLogoutFromDevice = async (deviceId: number) => {
    if (devicesData?.current && devicesData.current.deviceId === deviceId) {
      setIsLogoutModalActive(true);
      return;
    }

    try {
      await logoutFromDevice(deviceId.toString()).unwrap();
    } catch (error) {
      console.error('Failed to logout from device:', error);
    }
  };

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

  const handleTerminateAllOtherDevices = async () => {
    try {
      await terminateAllOtherDevices().unwrap();
    } catch (error) {
      console.error('Failed to terminate all other devices:', error);
    }
  };

  const handleCloseModal = () => {
    setIsLogoutModalActive(false);
  };

  if (isLoading) {
    return <LoaderLinear />;
  }

  if (error) {
    return <div>{t('ErrorLoadingSessions')}</div>;
  }

  return (
    <div className={s.container}>
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
