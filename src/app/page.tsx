'use client';

import React from 'react';
import { Card } from '@internshipsamyrai44-ui-kit/components-lib';
import Header from '@/widgets/header/Header';
import styles from './page.module.scss';

export default function Home() {
  return (
    <>
      <Header />
      <Card className={styles.card}>
        <span>Public page</span>
      </Card>
    </>
  );
}
