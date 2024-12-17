'use client';

import React from 'react';
import { Privacy } from '@/shared/ui/privacy/Privacy';
import s from './privacyPage.module.scss';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';

export default function PrivacyPolicy() {
  return (
    <div className={s.container}>
      <Button variant={'ghost'} asChild>
        <a href={'/auth/login'}>Back to Sign in</a>
      </Button>
      <Privacy />
    </div>
  );
}
