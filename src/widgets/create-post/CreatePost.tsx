'use client';

import s from './CreatePost.module.scss';

import * as React from 'react';
import { KeyboardEventHandler, useState } from 'react';
import { Startlayout } from '@/widgets/create-post/Start-layout/Startlayout';
import { Cropping } from '@/widgets/create-post/Cropping/Cropping';
import { Filters } from '@/widgets/create-post/Filters/Filters';
import { Publication } from '@/widgets/create-post/Publication/Publication';
import { Button, Typography } from '@internshipsamyrai44-ui-kit/components-lib';

type PropsType = {
  // eslint-disable-next-line no-unused-vars
  setCreatePostActive: (value: boolean) => void;
};

export const CreatePost = (props: PropsType) => {
  const { setCreatePostActive } = props;

  const [userPhotos, setUserPhotos] = useState<string[]>([]);
  const [page, setPage] = useState<number | null>(null);

  const stepTitle = (): string => {
    switch (page) {
      case 0:
        return 'Cropping' as string;
      case 1:
        return 'Filters' as string;
      case 2:
        return 'Publications' as string;
      default:
        return 'Add Photo' as string;
    }
  };

  const renderStep = () => {
    switch (page) {
      case 0: {
        return <Cropping userPhotos={userPhotos} setUserPhotos={setUserPhotos} setPage={setPage} />;
      }
      case 1: {
        return <Filters userPhotos={userPhotos} setPage={setPage} />;
      }
      case 2: {
        return <Publication userPhotos={userPhotos} setPage={setPage} />;
      }
      default: {
        return <Startlayout userPhotos={userPhotos} setUserPhotos={setUserPhotos} setPage={setPage} />;
      }
    }
  };

  const onKeyDownHandler: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Escape') {
      setCreatePostActive(false);
    }
  };

  return (
    <div className={s.wrapper} onKeyDown={onKeyDownHandler} tabIndex={0}>
      <div className={s.steps}>
        <div className={s.header}>
          <Typography variant={'h3'}>{stepTitle()}</Typography>
          <Button
            variant={'ghost'}
            className={s.btn}
            aria-label={'Close window'}
            onClick={() => setCreatePostActive(false)}
          ></Button>
        </div>
        {renderStep()}
      </div>
    </div>
  );
};
