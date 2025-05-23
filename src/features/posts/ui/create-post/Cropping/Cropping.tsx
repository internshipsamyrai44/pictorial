import Image from 'next/image';
import { Button, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import placeholder from '../../../../../../public/images/photo-placeholder.png';
import ResizeIcon from '../../../../../../public/icons/resizeIcon.svg';
import FileIcon from '../../../../../../public/icons/PicIcon.svg';
import ZoomLensIcon from '../../../../../../public/icons/zoomLens.svg';
import { useEffect, useRef, useState } from 'react';
import { Thumbs } from '@/features/posts/ui/create-post/Thumbs/Thumbs';
import { AspectRatioType, ResizePhoto } from '@/features/posts/ui/create-post/ResizePhoto/ResizePhoto';
import { ZoomPhoto } from '@/features/posts/ui/create-post/ZoomPhoto/ZoomPhoto';
import { Carousel } from '@/features/posts/ui/create-post/Carousel/Carousel';

import { useTranslations } from 'next-intl';
import { useCreatePostContext } from '@/shared/hooks/useCreatePostContext';
import { useUploadUserPhotoPreview } from '@/shared/hooks/useUploadUserPhotoPreview';
import s from './Cropping.module.scss';

type optionType = 'thumbs' | 'resizer' | 'zoom' | null;

export const Cropping = () => {
  const { userPhotos, setCurrentPhotoId, currentPhotoId } = useCreatePostContext();
  const { uploadUserPhotoPreview, errorUploadModal, setErrorUploadModal } = useUploadUserPhotoPreview();
  const t = useTranslations('Post');

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [activeOption, setActiveOption] = useState<optionType>(null);
  const [aspectRatio, setAspectRatio] = useState<AspectRatioType>('square');
  const [zoomValue, setZoomValue] = useState('1');
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const toggleOption = (option: optionType) => {
    setActiveOption((prevBlock: optionType) => (prevBlock === option ? null : option));
  };

  const isActive = (option: optionType) => activeOption === option;

  useEffect(() => {
    if (userPhotos.length > 0) {
      setCurrentPhotoId(userPhotos[activeSlideIndex].id);
    }
  }, [activeSlideIndex, userPhotos]);

  return (
    <>
      <div className={s.wrapper}>
        <Carousel onSlideChange={setActiveSlideIndex}>
          {userPhotos.map((photo) => {
            if (photo.id === currentPhotoId) {
              return (
                <Image
                  src={photo.uri || placeholder}
                  className={`${s.image} ${s[aspectRatio]}`}
                  alt={'User Photo'}
                  layout="responsive"
                  width={100}
                  height={100}
                  style={{
                    transform: `scale(${photo.zoom})`,
                    transformOrigin: 'center center',
                    transition: 'transform 0.2s ease-in-out'
                  }}
                  key={`user-photo-${photo.id}`}
                />
              );
            }
          })}
        </Carousel>

        <input
          type="file"
          accept="image/jpeg, image/png"
          id="photo-loading"
          ref={fileInputRef}
          className={s.input}
          onChange={uploadUserPhotoPreview}
        />
        <div className={s.btns}>
          <Button
            variant={'ghost'}
            onClick={() => toggleOption('resizer')}
            className={`${s.button} ${s.resize}`}
            aria-label={'Open photo resizer'}
          >
            <ResizeIcon className={s.icon} />
          </Button>
          {isActive('resizer') && <ResizePhoto setAspectRatio={setAspectRatio} />}
          <Button
            variant={'ghost'}
            onClick={() => toggleOption('zoom')}
            className={`${s.button} ${s.zoom}`}
            aria-label={'Open photo zoomValue'}
          >
            <ZoomLensIcon className={s.icon} />
          </Button>
          {isActive('zoom') && <ZoomPhoto setZoomValue={setZoomValue} zoomValue={zoomValue} />}
          <Button
            variant={'ghost'}
            onClick={() => toggleOption('thumbs')}
            className={`${s.button} ${s.file}`}
            aria-label={'Open photos thumbs list'}
          >
            <FileIcon className={s.icon} />
          </Button>
          {isActive('thumbs') && <Thumbs userPhotos={userPhotos} handleButtonClick={handleButtonClick} />}
        </div>
      </div>
      {errorUploadModal && (
        <Modal title={t('CreatePost.ErrorUpload')} className={s.modal} onClose={() => setErrorUploadModal(false)}>
          {t('CreatePost.ErrorUploadDescription')}
          <div className={s.btn}>
            <Button variant={'primary'} onClick={() => setErrorUploadModal(false)}>
              {t('CreatePost.TryAgain')}
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};
