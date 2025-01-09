'use client';

import { Privacy } from '@/shared/ui/privacy/Privacy';
import { PATH } from '@/shared/const/PATH';
import { ContentPage } from '@/widgets/content-page/ContentPage';

export default function PrivacyPolicy() {
  return (
    <ContentPage title={'Back to Sign Up'} backHref={PATH.AUTH.SIGNUP}>
      <Privacy />
    </ContentPage>
  );
}
