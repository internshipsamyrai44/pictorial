'use client';

import s from './CreatePost.module.scss';

import { KeyboardEventHandler, useState } from 'react';
import { Startlayout } from '@/features/posts/ui/create-post/Start-layout/Startlayout';
import { Cropping } from '@/features/posts/ui/create-post/Cropping/Cropping';
import { Filters } from '@/features/posts/ui/create-post/Filters/Filters';
import { Publication } from '@/features/posts/ui/create-post/Publication/Publication';
import { CreatePostHeader } from '@/features/posts/ui/create-post/CreatePostHeader/CreatePostHeader';
import { useCreatePostMutation, useUploadImagesMutation } from '@/features/posts/api/postsApi';
import { dataURLtoFile } from '@/shared/utils/dataUrlToFile';
import { Button, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';

type PropsType = {
  // eslint-disable-next-line no-unused-vars
  setCreatePostActive: (value: boolean) => void;
};

export const CreatePost = (props: PropsType) => {
  const { setCreatePostActive } = props;
  const TOTAL_PAGES = 4;
  const [userPhotos, setUserPhotos] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [textAreaValue, setTextAreaValue] = useState<string>('');
  const [modalCloseActive, setModalCloseActive] = useState(false);
  const [uploadImages] = useUploadImagesMutation();
  const [createPost] = useCreatePostMutation();
  const t = useTranslations('Post');

  const stepTitle = (): string => {
    switch (page) {
      case 0: {
        return t('CreatePost.AddPhoto') as string;
      }
      case 1: {
        return t('CreatePost.Cropping') as string;
      }
      case 2: {
        return t('CreatePost.Filters') as string;
      }
      case 3: {
        return t('CreatePost.Publications') as string;
      }
      default: {
        return t('CreatePost.AddPhoto') as string;
      }
    }
  };

  const renderStep = () => {
    switch (page) {
      case 0: {
        return <Startlayout userPhotos={userPhotos} setUserPhotos={setUserPhotos} paginate={paginate} />;
      }
      case 1: {
        return <Cropping userPhotos={userPhotos} setUserPhotos={setUserPhotos} />;
      }
      case 2: {
        return <Filters userPhotos={userPhotos} />;
      }
      case 3: {
        return (
          <Publication userPhotos={userPhotos} textAreaValue={textAreaValue} setTextAreaValue={setTextAreaValue} />
        );
      }
      default: {
        return <Startlayout userPhotos={userPhotos} setUserPhotos={setUserPhotos} paginate={paginate} />;
      }
    }
  };

  const onKeyDownHandler: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Escape') {
      setModalCloseActive(true);
    }
  };

  const paginate = (action: 'next' | 'prev' | 'close') => {
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
        setModalCloseActive(true);
        break;
      }
    }
  };

  const handleUploadPhotos = async () => {
    const formData = new FormData();

    userPhotos.forEach((file) => {
      formData.append(`file`, dataURLtoFile(file));
    });

    try {
      const res = await uploadImages(formData);

      await createPost({
        description: textAreaValue,
        childrenMetadata: [{ uploadId: res.data?.images[0].uploadId }]
      });
      alert('Successfully created!');
      paginate('close');
    } catch (error) {
      alert('Error creating post');
    }
  };

  return (
    <>
      <div className={s.wrapper} onKeyDown={onKeyDownHandler} onClick={() => setModalCloseActive(true)} tabIndex={0}>
        <div className={s.steps} onClick={(e) => e.stopPropagation()}>
          <CreatePostHeader
            page={page}
            totalPages={TOTAL_PAGES}
            stepTitle={stepTitle}
            paginate={paginate}
            handleUploadPhotos={handleUploadPhotos}
          />
          {renderStep()}
        </div>
      </div>
      {modalCloseActive && (
        <Modal title={t('CreatePost.Close')} className={s.modal} onClose={() => setModalCloseActive(false)}>
          <p>{t('CreatePost.CloseDescription')} </p>
          <div className={s.btns}>
            <Button variant={'primary'} onClick={() => setModalCloseActive(false)}>
              {t('CreatePost.Discard')}
            </Button>
            <Button
              variant={'outlined'}
              onClick={() => {
                setCreatePostActive(false);
              }}
            >
              {t('CreatePost.SaveDraft')}
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};
