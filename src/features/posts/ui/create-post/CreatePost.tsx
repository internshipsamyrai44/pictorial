'use client';

import s from './CreatePost.module.scss';
import { KeyboardEventHandler, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Startlayout } from '@/features/posts/ui/create-post/Start-layout/Startlayout';
import { Cropping } from '@/features/posts/ui/create-post/Cropping/Cropping';
import { Filters } from '@/features/posts/ui/create-post/Filters/Filters';
import { Publication } from '@/features/posts/ui/create-post/Publication/Publication';
import { CreatePostHeader } from '@/features/posts/ui/create-post/CreatePostHeader/CreatePostHeader';
import { useCreatePostMutation, useUploadImagesMutation } from '@/features/posts/api/postsApi';
import { dataURLtoFile } from '@/shared/utils/dataUrlToFile';
import { useCreatePostContext } from '@/shared/hooks/useCreatePostContext';
import { ModalClose } from '@/features/posts/ui/create-post/Modal/ModalClose';

type PropsType = {
  // eslint-disable-next-line no-unused-vars
  setCreatePostActive: (value: boolean) => void;
};

export const CreatePost = (props: PropsType) => {
  const t = useTranslations('Post');
  const { setCreatePostActive } = props;
  const { userPhotos, page, setModalCloseActive, modalCloseActive } = useCreatePostContext();
  const [textAreaValue, setTextAreaValue] = useState<string>('');

  const [uploadImages] = useUploadImagesMutation();
  const [createPost] = useCreatePostMutation();

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
        return <Startlayout />;
      }
      case 1: {
        return <Cropping />;
      }
      case 2: {
        return <Filters />;
      }
      case 3: {
        return <Publication textAreaValue={textAreaValue} setTextAreaValue={setTextAreaValue} />;
      }
      default: {
        return <Startlayout />;
      }
    }
  };

  const onKeyDownHandler: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.key === 'Escape') {
      setModalCloseActive(true);
    }
  };

  const handleUploadPhotos = async () => {
    const formData = new FormData();

    userPhotos.forEach((file: string) => {
      formData.append(`file`, dataURLtoFile(file));
    });

    try {
      const res = await uploadImages(formData);
      const uploadIdObjects = res.data?.images.map((image) => ({
        uploadId: image.uploadId
      }));

      await createPost({
        description: textAreaValue,
        childrenMetadata: uploadIdObjects
      });
      alert('Successfully created!');
      setCreatePostActive(false);
    } catch (error) {
      alert('Error creating post');
    }
  };

  return (
    <>
      <div className={s.wrapper} onKeyDown={onKeyDownHandler} onClick={() => setModalCloseActive(true)} tabIndex={0}>
        <div className={s.steps} onClick={(e) => e.stopPropagation()}>
          <CreatePostHeader stepTitle={stepTitle} handleUploadPhotos={handleUploadPhotos} />
          {renderStep()}
        </div>
      </div>
      {modalCloseActive && <ModalClose setCreatePostActive={setCreatePostActive} />}
    </>
  );
};
