'use client';

import s from './CreatePost.module.scss';
import { Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import * as React from 'react';
import { useState } from 'react';
import { Startlayout } from '@/widgets/create-post/Start-layout/Startlayout';
import { Cropping } from '@/widgets/create-post/Cropping/Cropping';

type PropsType = {
  // eslint-disable-next-line no-unused-vars
  setCreatePostActive: (value: boolean) => void;
};

export const CreatePost = (props: PropsType) => {
  const { setCreatePostActive } = props;

  const [userPhoto, setUserPhoto] = useState<string | null>(null);
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
        return <Cropping userPhoto={userPhoto} setPage={setPage} />;
      }
      default: {
        return <Startlayout userPhoto={userPhoto} setUserPhoto={setUserPhoto} setPage={setPage} />;
      }
    }
  };

  return (
    <Modal title={stepTitle()} className={s.wrapper} onClose={() => setCreatePostActive(false)}>
      {renderStep()}
    </Modal>
  );
};
