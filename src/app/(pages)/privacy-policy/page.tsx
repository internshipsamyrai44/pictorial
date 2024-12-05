'use client';

import React from 'react';
import { Privacy } from '@/shared/ui/privacy/Privacy';
import s from './privacyPage.module.scss';
import Header from '@/widgets/header/Header';

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className={s.container}>
        <button>Back to Sign in</button>
        <Privacy title={'Privacy Policy'} />
      </div>
    </>
  );
}
