import { useTranslations } from 'next-intl';

export const AccountManagement = () => {
  const t = useTranslations('Profile');
  return <div>{t('AccountManagementContent')}</div>;
};
