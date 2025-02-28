'use client';

import s from './CreatePost.module.scss';

import { KeyboardEventHandler, useState } from 'react';
import { Startlayout } from '@/features/posts/ui/Create-post/Start-layout/Startlayout';
import { Cropping } from '@/features/posts/ui/Create-post/Cropping/Cropping';
import { Filters } from '@/features/posts/ui/Create-post/Filters/Filters';
import { Publication } from '@/features/posts/ui/Create-post/Publication/Publication';
import { CreatePostHeader } from '@/features/posts/ui/Create-post/CreatePostHeader/CreatePostHeader';
import { useCreatePostMutation, useUploadImagesMutation } from '@/features/posts/api/postsApi';
import { dataURLtoFile } from '@/shared/utils/dataUrlToFile';
import { Button, Modal } from '@internshipsamyrai44-ui-kit/components-lib';

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
        <Modal title={'Close'} className={s.modal} onClose={() => setModalCloseActive(false)}>
          <p>Do you really want to close the creation of a publication? If you close everything will be deleted</p>
          <div className={s.btns}>
            <Button variant={'primary'} onClick={() => setModalCloseActive(false)}>
              Discard
            </Button>
            <Button
              variant={'outlined'}
              onClick={() => {
                setCreatePostActive(false);
              }}
            >
              Save Draft
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};
