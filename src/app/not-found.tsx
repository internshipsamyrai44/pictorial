'use client';

import { ContentPage } from '@/widgets/content-page/ContentPage';
import { NotFoundContent } from '@/shared/ui/not-found-content/NotFoundContent';

export default function NotFound() {
  return (
    <ContentPage title={'Back to home page'} backHref={'/'}>
      <NotFoundContent />
    </ContentPage>
  );
}
