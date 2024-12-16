'use client';

import Header from '@/widgets/header/Header';
import s from './termsOfService.module.scss';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import Terms from '@/shared/ui/terms/Terms';

export default function TermsOfService() {
  return (
    <>
      <Header />
      <div className={s.container}>
        <Button variant={'ghost'}>Back to Sign in </Button>
        <Terms />
      </div>
    </>
  );
}
