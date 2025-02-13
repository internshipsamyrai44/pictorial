import React from 'react';
import { Metadata } from 'next';
import ClientProvider from '@/app/store/ClientProvider';
import './globals.scss';
import s from './layout.module.scss';

export const metadata: Metadata = {
  title: 'Pictorial',
  description: 'Pictorial Next App',
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className={s.wrapper}>
          <ClientProvider>{children}</ClientProvider>
        </div>
      </body>
    </html>
  );
}
