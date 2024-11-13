import type { Metadata } from 'next';
import './globals.css';
import React from 'react';
import Head from 'next/head';

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
