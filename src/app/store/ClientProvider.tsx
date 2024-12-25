'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { GeneralHeader } from '@/widgets/general-header/GeneralHeader';
import { store } from '@/app/store/store';
import s from './ClientProvider.module.scss';
import { SideNavBar } from '@/widgets/side-nav-bar/SideNavBar';

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <div className={s.container}>
        <GeneralHeader />
        <div className={s.content}>
          <SideNavBar />
          {children}
        </div>
      </div>
    </Provider>
  );
}
