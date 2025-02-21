'use client';

import s from './CreatePost.module.scss';
import { Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import * as React from 'react';
import { useState } from 'react';
import { Startlayout } from '@/widgets/create-post/Start-layout/Startlayout';
import { Cropping } from '@/widgets/create-post/Cropping/Cropping';
import { Filters } from '@/widgets/create-post/Filters/Filters';
import { Publication } from '@/widgets/create-post/Publication/Publication';

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
        return <Cropping userPhotos={userPhotos} setPage={setPage} />;
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

  return (
    <Modal title={stepTitle()} className={s.wrapper} onClose={() => setCreatePostActive(false)}>
      {renderStep()}
    </Modal>
  );
};
