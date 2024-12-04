'use client';

import React from 'react';
import Header from '@/widgets/header/Header';
import styles from './page.module.scss';
import { Pagination, Card, AlertPopup } from '@internshipsamyrai44-ui-kit/components-lib';

export default function Home() {
  return (
    <>
      <Header />
      <Card className={styles.card}>
        <span>Test global styles - Public page</span>
      </Card>
      <Pagination
        currentPage={0}
        onChangePage={function (): void {
          throw new Error('Function not implemented.');
        }}
        pageSize={5}
        totalCount={100}
      />
    </>
  );
}
