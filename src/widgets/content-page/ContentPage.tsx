'use client';

import React from 'react';
import { ReturnLink } from '@/widgets/return-link/ReturnLink';
import s from './ContentPage.module.scss';

type ContentPageType = {
  title?: string;
  backHref?: string;
  children: React.ReactNode;
};

export const ContentPage = ({ title, backHref, children }: ContentPageType) => {
  return (
    <div className={s.container}>
      {title && backHref && <ReturnLink text={title} backHref={backHref} />}
      {children}
    </div>
  );
};
