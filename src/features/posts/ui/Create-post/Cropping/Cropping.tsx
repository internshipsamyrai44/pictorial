import Image from 'next/image';
import { Button, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './Cropping.module.scss';
import placeholder from '../../../../../../public/images/photo-placeholder.png';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { Thumbs } from '@/features/posts/ui/Create-post/Thumbs/Thumbs';
import { aspectRatioType, ResizePhoto } from '@/features/posts/ui/Create-post/ResizePhoto/ResizePhoto';
import { ZoomPhoto } from '@/features/posts/ui/Create-post/ZoomPhoto/ZoomPhoto';
import { Carousel } from '@/features/posts/ui/Create-post/Carousel/Carousel';
import { useCheckUploadedImage } from '@/shared/hooks/useCheckUploadedImage';

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
            className={s.resize}
            aria-label={'Open photo resizer'}
          ></Button>
          {isActive('resizer') && <ResizePhoto setAspectRatio={setAspectRatio} />}
          <Button
            variant={'ghost'}
            onClick={() => toggleOption('zoom')}
            className={s.zoom}
            aria-label={'Open photo zoomValue'}
          ></Button>
          {isActive('zoom') && <ZoomPhoto setZoomValue={setZoomValue} zoomValue={zoomValue} />}
          <Button
            variant={'ghost'}
            onClick={() => toggleOption('thumbs')}
            className={s.file}
            aria-label={'Open photos thumbs list'}
          ></Button>
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
        <Modal title={'Error upload'} className={s.modal} onClose={() => setErrorUploadModal(false)}>
          <p> Please upload JPEG or PNG image format!</p>
          <p> Upload a file smaller than 20MB!</p>
          <div className={s.btn}>
            <Button variant={'primary'} onClick={() => setErrorUploadModal(false)}>
              Try again
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};
