'use client';

import Terms from '@/shared/ui/terms/Terms';
import { PATH } from '@/shared/const/PATH';
import { BackToLink } from '@/widgets/back-to-link/BackToLink';
import s from './termsOfService.module.scss';

export default function TermsOfService() {
  return (
    <div className={s.container}>
      <BackToLink text={'Back to Sign Up'} backHref={PATH.SIGNUP} />
      <Terms />
    </div>
  );
}
