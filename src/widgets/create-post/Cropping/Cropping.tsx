import Image from 'next/image';
import * as React from 'react';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './Cropping.module.scss';
import placeholder from '../../../../public/images/photo-placeholder.png';

type PropsType = {
  userPhotos: string[];
  // eslint-disable-next-line no-unused-vars
  setPage: (page: number | null) => void;
};

export const Cropping = (props: PropsType) => {
  const { userPhotos, setPage } = props;
  return (
    <div className={s.wrapper}>
      <div className={s.buttons}>
        <Button variant={'ghost'} onClick={() => setPage(null)}>
          {'<'}
        </Button>{' '}
        <Button variant={'ghost'} onClick={() => setPage(1)}>
          {'Next'}
        </Button>
      </div>
      <Image src={userPhotos[0] || placeholder} alt={'User Photo'} layout="responsive" width={100} height={100} />
    </div>
  );
};
