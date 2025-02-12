'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/app/store/store';
import s from './ClientProvider.module.scss';
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID_GOOGLE || '';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <div className={s.container}>
          <div className={s.content}>
            <div className={s['main-content']}>{children}</div>
          </div>
        </div>
      </Provider>
    </GoogleOAuthProvider>
  );
}
