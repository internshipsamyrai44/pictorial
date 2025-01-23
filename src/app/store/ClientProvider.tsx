'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { GeneralHeader } from '@/widgets/general-header/GeneralHeader';
import { store } from '@/app/store/store';
// import { SideNavPanel } from '@/widgets/side-nav-panel/SideNavPanel';
import s from './ClientProvider.module.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID_GOOGLE || '';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <div className={s.container}>
          <GeneralHeader />
          <div className={s.content}>
            {/*<SideNavPanel className={s['sidebar-height']} />*/}
            <div className={s['main-content']}>{children}</div>
          </div>
        </div>
      </Provider>
    </GoogleOAuthProvider>
  );
}
