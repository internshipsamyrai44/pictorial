'use client';

import Link from 'next/link';
import s from './GeneralHeader.module.scss';
import { HeaderButton } from '@/widgets/general-header/headerButton/HeaderButton';
import { SelectTranslate } from '@/widgets/general-header/selectTranslate/SelectTranslate';

type GeneralHeaderProps = {
  isAuth: boolean;
};

export const GeneralHeader = ({ isAuth = false }: GeneralHeaderProps) => (
  <header className={s.wrapper}>
    <div className={s.container}>
      <Link href="/" className={s.logo}>
        Inctagram
      </Link>
      <div className={s.headerActions}>
        <SelectTranslate />
        {!isAuth && <HeaderButton />}
      </div>
    </div>
  </header>
);
