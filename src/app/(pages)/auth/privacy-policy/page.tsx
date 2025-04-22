'use client';

import { Privacy } from '@/shared/ui/privacy/Privacy';
import { PATH } from '@/shared/const/PATH';
import { ContentPage } from '@/widgets/content-page/ContentPage';
import { useTranslations } from 'next-intl';

export default function PrivacyPolicy() {
  const t = useTranslations('Auth');
  return (
    <ContentPage title={t('BackToSignUp')} backHref={PATH.AUTH.SIGNUP}>
      <Privacy />
    </ContentPage>
  );
}
