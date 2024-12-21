'use client';

import React from 'react';
import { BackToLink } from '@/widgets/back-to-link/BackToLink';
import s from './ContentPage.module.scss';

type ContentPage = {
  title: string;
  backHref: string;
  children: React.ReactNode;
};

export const ContentPage = ({ title, backHref, children }: ContentPage) => {
  return (
    <div className={s.container}>
      <BackToLink text={title} backHref={backHref} />
      {children}
    </div>
  );
};
