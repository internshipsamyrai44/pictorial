import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './globals.scss';
import { GeneralHeader } from '@/widgets/general-header/GeneralHeader';
import { Metadata } from 'next';

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
      <Provider store={store}>
        <body>
          <GeneralHeader />
          {children}
        </body>
      </Provider>
    </html>
  );
}
