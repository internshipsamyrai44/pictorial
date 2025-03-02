import Image from 'next/image';
import { Button, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './Cropping.module.scss';
import placeholder from '../../../../../../public/images/photo-placeholder.png';
import ResizeIcon from '../../../../../../public/icons/resizeIcon.svg';
import FileIcon from '../../../../../../public/icons/PicIcon.svg';
import ZoomLensIcon from '../../../../../../public/icons/zoomLens.svg';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Thumbs } from '@/features/posts/ui/create-post/Thumbs/Thumbs';
import { aspectRatioType, ResizePhoto } from '@/features/posts/ui/create-post/ResizePhoto/ResizePhoto';
import { ZoomPhoto } from '@/features/posts/ui/create-post/ZoomPhoto/ZoomPhoto';
import { Carousel } from '@/features/posts/ui/create-post/Carousel/Carousel';
import { useCheckUploadedImage } from '@/shared/hooks/useCheckUploadedImage';
import { useTranslations } from 'next-intl';

type PropsType = {
  userPhotos: string[];
  // eslint-disable-next-line no-unused-vars
  setUserPhotos: Dispatch<SetStateAction<string[]>>;
};

type optionType = 'thumbs' | 'resizer' | 'zoom' | null;

export const Cropping = (props: PropsType) => {
  const { userPhotos, setUserPhotos } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [activeOption, setActiveOption] = useState<optionType>(null);
  const [aspectRatio, setAspectRatio] = useState<aspectRatioType>('square');
  const [zoomValue, setZoomValue] = useState('1');
  const { isImageCorrect, errorUploadModal, setErrorUploadModal } = useCheckUploadedImage();
  const t = useTranslations('Post');

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const uploadUserPhotoHandler = (e: any) => {
    const userPhotoFile = e.target.files?.[0];

    if (!isImageCorrect(userPhotoFile)) {
      setErrorUploadModal(true);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        setUserPhotos((prevPhotos) => [...prevPhotos, reader.result as string]);
      }
    };
    reader.readAsDataURL(userPhotoFile);
  };

  const removeUserPhotoHandler = (photoIndex: number) => {
    setUserPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== photoIndex));
  };

  const toggleOption = (option: optionType) => {
    setActiveOption((prevBlock: optionType) => (prevBlock === option ? null : option));
  };

  const isActive = (option: optionType) => activeOption === option;

  return (
    <>
      <div className={s.wrapper}>
        <Carousel>
          {userPhotos.map((photo, index) => (
            <Image
              src={photo || placeholder}
              className={s[aspectRatio]}
              alt={'User Photo'}
              layout="responsive"
              width={100}
              height={100}
              style={{
                transform: `scale(${zoomValue})`,
                transformOrigin: 'center center',
                transition: 'transform 0.2s ease-in-out'
              }}
              key={`user-photo-${index}`}
            />
          ))}
        </Carousel>

        <input
          type="file"
          accept="image/jpeg, image/png"
          id="photo-loading"
          ref={fileInputRef}
          className={s.input}
          onChange={uploadUserPhotoHandler}
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
          {isActive('thumbs') && (
            <Thumbs
              userPhotos={userPhotos}
              handleButtonClick={handleButtonClick}
              removeUserPhotoHandler={removeUserPhotoHandler}
            />
          )}
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
