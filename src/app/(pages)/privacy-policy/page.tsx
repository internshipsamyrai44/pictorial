import React from 'react';
import { Privacy } from '@/shared/ui/privacy/Privacy';
import s from './privacyPage.module.scss';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';

export default function PrivacyPolicy() {
  return (
    <div className={s.container}>
      <Button variant={'outlined'} title={'Back to Sign in'} />
      <Privacy title={'Privacy Policy'} />
    </div>
  );
}
