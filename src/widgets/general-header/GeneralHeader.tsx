'use client';

import { HeaderButton } from '@/widgets/general-header/headerButton/HeaderButton';
import { SelectTranslate } from '@/widgets/general-header/selectTranslate/SelectTranslate';
import Link from 'next/link';
import s from './GeneralHeader.module.scss';
import { Notifications } from '@/features/notifications/ui/Notifications';

type Props = {
  isPublic?: boolean;
};

export const GeneralHeader = ({ isPublic }: Props) => (
  <header className={s.wrapper}>
    <div className={s.container}>
      <Link href="/" className={s.logo}>
        Pictorial
      </Link>
      <div className={s.headerActions}>
        {!isPublic && <Notifications />}
        <SelectTranslate />
        {isPublic && <HeaderButton />}
      </div>
    </div>
  </header>
);
