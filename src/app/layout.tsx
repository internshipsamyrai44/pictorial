'use client';

import React from 'react';
import './globals.scss';
import { Provider } from 'react-redux';
import { store } from './store/store';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Pictorial</title>
        <meta name="description" content="Pictorial Next App" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <Provider store={store}>
        <body>{children}</body>
      </Provider>
    </html>
  );
}
