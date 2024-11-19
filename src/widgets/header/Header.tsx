'use client';

import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import styles from './Header.module.scss';

export default function Header() {
  const handleTest = () => {
    alert('Lib component works');
  };
  return (
    <header className={styles.header}>
      <h2>Pictorial Header</h2>
      <Button variant={'primary'} onClick={handleTest}>
        Sign In
      </Button>
    </header>
  );
}
