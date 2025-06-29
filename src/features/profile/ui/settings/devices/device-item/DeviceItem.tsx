import { Button, LogOutIcon, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';
import { Device } from '@/features/profile/model/devices.types';
import { DesktopIcon, MobileIcon } from '../../../../../../../public/icons/DeviceIcons';
import s from './DeviceItem.module.scss';

type DeviceItemProps = {
  device: Device;
  // eslint-disable-next-line no-unused-vars
  onLogout: (deviceId: number) => void;
  isLoading: boolean;
  showLogoutButton?: boolean;
  // eslint-disable-next-line no-unused-vars
  formatDate?: (dateString: string) => string;
};

const getDeviceIcon = (device: Device) => {
  switch (device.deviceType) {
    case 'mobile':
    case 'tablet':
      return <MobileIcon />;
    case 'desktop':
      return <DesktopIcon />;
    default:
      return <DesktopIcon />;
  }
};

const getDeviceName = (device: Device) => {
  return device.browserName || device.deviceName;
};

export const DeviceItem = ({ device, onLogout, isLoading, showLogoutButton = true, formatDate }: DeviceItemProps) => {
  const t = useTranslations('Sessions');

  return (
    <div className={s.deviceItem}>
      <div className={s.deviceContent}>
        <div className={s.deviceIcon}>{getDeviceIcon(device)}</div>
        <div className={s.deviceInfo}>
          <Typography variant="bold-text-16" className={s.deviceName}>
            {getDeviceName(device)}
          </Typography>
          <Typography variant="regular-text-14" className={s.deviceDetails}>
            IP: {device.ip}
          </Typography>
          {formatDate && (
            <Typography variant="regular-text-14" className={s.lastVisit}>
              {t('LastVisit')}: {formatDate(device.lastActive)}
            </Typography>
          )}
        </div>
      </div>

      {showLogoutButton && (
        <Button
          variant="ghost"
          onClick={() => onLogout(device.deviceId)}
          disabled={isLoading}
          className={s.logoutButton}
          aria-label={t('LogOut')}
        >
          <LogOutIcon fill="var(--light-100)" />
          <span className={s.logoutButtonText}>{t('LogOut')}</span>
        </Button>
      )}
    </div>
  );
};
