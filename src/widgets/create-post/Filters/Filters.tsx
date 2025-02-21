import Image from 'next/image';
import * as React from 'react';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './Filters.module.scss';
import placeholder from '../../../../public/images/photo-placeholder.png';

type PropsType = {
  userPhotos: string[];
  // eslint-disable-next-line no-unused-vars
  setPage: (page: number) => void;
};

export const Filters = (props: PropsType) => {
  const { userPhotos, setPage } = props;
  return (
    <>
      <div className={s.buttons}>
        <Button variant={'ghost'} onClick={() => setPage(0)} className={s.back} aria-label={'Previous step'}></Button>
        <Button variant={'ghost'} onClick={() => setPage(2)}>
          {'Next'}
        </Button>
      </div>
      <div className={s.wrapper}>
        <Image
          src={userPhotos[0] || placeholder}
          className={s.image}
          alt={'User Photo'}
          layout="responsive"
          width={100}
          height={100}
        />
        <div className={s.filters}></div>
      </div>
    </>
  );
};
