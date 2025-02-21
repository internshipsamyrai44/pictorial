import Image from 'next/image';
import * as React from 'react';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './Filters.module.scss';

type PropsType = {
  userPhoto: string | null;
  // eslint-disable-next-line no-unused-vars
  setPage: (page: number | null) => void;
};

export const Filters = (props: PropsType) => {
  const { userPhoto, setPage } = props;
  return (
    <>
      <div className={s.buttons}>
        <Button variant={'ghost'} onClick={() => setPage(1)}>
          {'<'}
        </Button>{' '}
        <Button variant={'ghost'} onClick={() => setPage(2)}>
          {'Next'}
        </Button>
      </div>
      <div className={s.wrapper}>
        <Image
          src={userPhoto as string}
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
