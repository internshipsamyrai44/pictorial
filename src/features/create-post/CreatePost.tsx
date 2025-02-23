'use client';

import s from './CreatePost.module.scss';

import { KeyboardEventHandler, useState } from 'react';
import { Startlayout } from '@/features/create-post/Start-layout/Startlayout';
import { Cropping } from '@/features/create-post/Cropping/Cropping';
import { Filters } from '@/features/create-post/Filters/Filters';
import { Publication } from '@/features/create-post/Publication/Publication';
import { CreatePostHeader } from '@/features/create-post/CreatePostHeader/CreatePostHeader';

type PropsType = {
  // eslint-disable-next-line no-unused-vars
  setCreatePostActive: (value: boolean) => void;
};

export const CreatePost = (props: PropsType) => {
  const { setCreatePostActive } = props;
  const TOTAL_PAGES = 4;
  const [userPhotos, setUserPhotos] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);

  const stepTitle = (): string => {
    switch (page) {
      case 0: {
        return 'Add Photo' as string;
      }
      case 1: {
        return 'Cropping' as string;
      }
      case 2: {
        return 'Filters' as string;
      }
      case 3: {
        return 'Publications' as string;
      }
      default: {
        return 'Add Photo' as string;
      }
    }
  };

  const renderStep = () => {
    switch (page) {
      case 0: {
        return <Startlayout userPhotos={userPhotos} setUserPhotos={setUserPhotos} handlePaginate={handlePaginate} />;
      }
      case 1: {
        return <Cropping userPhotos={userPhotos} setUserPhotos={setUserPhotos} />;
      }
      case 2: {
        return <Filters userPhotos={userPhotos} />;
      }
      case 3: {
        return <Publication userPhotos={userPhotos} />;
      }
      default: {
        return <Startlayout userPhotos={userPhotos} setUserPhotos={setUserPhotos} handlePaginate={handlePaginate} />;
      }
    }
  };

  const onKeyDownHandler: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Escape') {
      setCreatePostActive(false);
    }
  };

  const handlePaginate = (action: 'next' | 'prev' | 'close') => {
    switch (action) {
      case 'next': {
        if (page < TOTAL_PAGES - 1) {
          setPage((prev) => prev + 1);
        }
        break;
      }

      case 'prev': {
        if (page > 0) {
          setPage((prev) => prev - 1);
        } else {
          setPage(0);
        }
        break;
      }

      case 'close': {
        setCreatePostActive(false);
        break;
      }
    }
  };

  return (
    <div className={s.wrapper} onKeyDown={onKeyDownHandler} onClick={() => handlePaginate('close')} tabIndex={0}>
      <div className={s.steps} onClick={(e) => e.stopPropagation()}>
        <CreatePostHeader page={page} totalPages={TOTAL_PAGES} stepTitle={stepTitle} handlePaginate={handlePaginate} />
        {renderStep()}
      </div>
    </div>
  );
};
