import type { Metadata } from 'next';
import React from 'react';
import Head from 'next/head';
import './globals.scss';

export const metadata: Metadata = {
  title: 'Pictorial',
  description: 'Pictorial Next App'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <body>{children}</body>
    </html>
  );
}
