'use client';
import Image from 'next/image';
import notFoundImg from './../../../../public/404.png';
import s from './NotFound.module.scss';
import Header from '@/widgets/header/Header';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';

export default function NotFound() {
  return (
    <>
      <Header />
      <div className={s.errorWrapper}>
        <Button variant={'secondary'} title={'back'} type={'button'} fullWidth />
        <Image alt={'404 page'} height={190} src={notFoundImg} width={450} />
      </div>
    </>
  );
}
