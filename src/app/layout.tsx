import ClientProvider from '@/app/store/ClientProvider';
import { Metadata } from 'next';
import React from 'react';
import './globals.scss';
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
        <ClientProvider>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
