'use client';

import { Terms } from '@/shared/ui/terms/Terms';
import { PATH } from '@/shared/const/PATH';
import { ContentPage } from '@/widgets/content-page/ContentPage';

export default function TermsOfService() {
  return (
    <ContentPage title={'Back to Sign Up'} backHref={PATH.AUTH.SIGNUP}>
      <Terms />
    </ContentPage>
  );
}
