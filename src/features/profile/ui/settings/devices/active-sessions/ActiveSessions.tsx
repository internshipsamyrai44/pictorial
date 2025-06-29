import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';
import { Device } from '@/features/profile/model/devices.types';
import { DeviceItem } from '../device-item/DeviceItem';
import s from './ActiveSessions.module.scss';

type ActiveSessionsProps = {
  devices: Device[];
  // eslint-disable-next-line no-unused-vars
  onLogout: (deviceId: number) => void;
  isLoading: boolean;
  // eslint-disable-next-line no-unused-vars
  formatDate: (dateString: string) => string;
};

export const ActiveSessions = ({ devices, onLogout, isLoading, formatDate }: ActiveSessionsProps) => {
  const t = useTranslations('Sessions');

  if (!devices || devices.length === 0) {
    return null;
  }

  return (
    <section className={s.section}>
      <Typography variant="h3" className={s.sectionTitle}>
        {t('ActiveSessions')}
      </Typography>

      <div className={s.devicesList}>
        {devices.map((device: Device) => (
          <DeviceItem
            key={device.deviceId}
            device={device}
            onLogout={onLogout}
            isLoading={isLoading}
            formatDate={formatDate}
          />
        ))}
      </div>
    </section>
  );
};
