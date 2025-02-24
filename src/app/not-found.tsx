'use client';

import { ContentPage } from '@/widgets/content-page/ContentPage';
import { NotFoundContent } from '@/shared/ui/not-found-content/NotFoundContent';
import { PATH } from '@/shared/const/PATH';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFound');
  return (
    <ContentPage title={t('BacktoHomePage')} backHref={PATH.MAIN}>
      <NotFoundContent />
    </ContentPage>
  );
}
