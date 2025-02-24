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

type PropsType = {
  // eslint-disable-next-line no-unused-vars
  setCreatePostActive: (value: boolean) => void;
};

export const CreatePost = (props: PropsType) => {
  const { setCreatePostActive } = props;
  const TOTAL_PAGES = 4;
  const [userPhotos, setUserPhotos] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
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
        return <Publication userPhotos={userPhotos} />;
      }
      default: {
        return <Startlayout userPhotos={userPhotos} setUserPhotos={setUserPhotos} paginate={paginate} />;
      }
    }
  };

  const onKeyDownHandler: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Escape') {
      setCreatePostActive(false);
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
        setCreatePostActive(false);
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
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        childrenMetadata: [{ uploadId: res.data?.images[0].uploadId }]
      });
      alert('Successfully created!');
      paginate('close');
    } catch (error) {
      alert('Error creating post');
    }
  };

  return (
    <div className={s.wrapper} onKeyDown={onKeyDownHandler} onClick={() => paginate('close')} tabIndex={0}>
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
  );
};
