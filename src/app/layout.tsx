import type { Metadata } from "next";
import "./globals.css";
import React from 'react'

export const metadata: Metadata = {
  title: "Pictorial",
  description: "Pictorial Next App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
