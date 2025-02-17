import React from 'react';
import { Metadata } from 'next';
import ClientProvider from '@/app/store/ClientProvider';
import './globals.scss';
import s from './layout.module.scss';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Pictorial',
  description: 'Pictorial Next App',
  icons: {
    icon: '/favicon.ico'
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <div className={s.wrapper}>
          <ClientProvider>
            <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
          </ClientProvider>
        </div>
      </body>
    </html>
  );
}
