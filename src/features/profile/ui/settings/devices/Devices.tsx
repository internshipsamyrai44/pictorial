import { useTranslations } from 'next-intl';

export const Devices = () => {
  const t = useTranslations('Profile');

  return <div>{t('DevicesContent')}</div>;
};
