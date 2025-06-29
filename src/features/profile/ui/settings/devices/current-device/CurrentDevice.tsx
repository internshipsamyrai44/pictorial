import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';
import { Device } from '@/features/profile/model/devices.types';
import { DeviceItem } from '../device-item/DeviceItem';
import s from './CurrentDevice.module.scss';

type CurrentDeviceProps = {
  device: Device;
  // eslint-disable-next-line no-unused-vars
  onLogout: (deviceId: number) => void;
  isLoading: boolean;
};

export const CurrentDevice = ({ device, onLogout, isLoading }: CurrentDeviceProps) => {
  const t = useTranslations('Sessions');

  return (
    <section className={s.section}>
      <Typography variant="h3" className={s.sectionTitle}>
        {t('CurrentDevice')}
      </Typography>
      <DeviceItem device={device} onLogout={onLogout} isLoading={isLoading} showLogoutButton={false} />
    </section>
  );
};
