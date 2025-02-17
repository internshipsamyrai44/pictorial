'use client';

import Link from 'next/link';
import s from './GeneralHeader.module.scss';
import { HeaderButton } from '@/widgets/general-header/headerButton/HeaderButton';
import { SelectTranslate } from '@/widgets/general-header/selectTranslate/SelectTranslate';

type GeneralHeaderProps = {
  isPublic: boolean;
};

export const GeneralHeader = ({ isPublic = false }: GeneralHeaderProps) => (
  <header className={s.wrapper}>
    <div className={s.container}>
      <Link href="/" className={s.logo}>
        Inctagram
      </Link>
      <div className={s.headerActions}>
        <SelectTranslate />
        {!isPublic && <HeaderButton />}
      </div>
    </div>
  </header>
);
