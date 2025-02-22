import { useTranslations } from 'next-intl';

export const Payments = () => {
  const t = useTranslations('Profile');
  return <div>{t('PaymentsContent')}</div>;
};
