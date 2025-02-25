import Image from 'next/image';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './Cropping.module.scss';
import placeholder from '../../../../../../public/images/photo-placeholder.png';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { isImageCorrect } from '@/features/posts/ui/Create-post/Start-layout/Startlayout';
import { Thumbs } from '@/features/posts/ui/Create-post/Thumbs/Thumbs';
import { ResizePhoto } from '@/features/posts/ui/Create-post/ResizePhoto/ResizePhoto';
import { ZoomPhoto } from '@/features/posts/ui/Create-post/ZoomPhoto/ZoomPhoto';

type PropsType = {
  userPhotos: string[];
  // eslint-disable-next-line no-unused-vars
  setUserPhotos: Dispatch<SetStateAction<string[]>>;
};

export const Cropping = (props: PropsType) => {
  const { userPhotos, setUserPhotos } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showThumbs, setShowTumbs] = useState(false);
  const [showResizer, setShowResizer] = useState(false);
  const [showZoom, setShowZoom] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const uploadUserPhotoHandler = (e: any) => {
    const userPhotoFile = e.target.files?.[0];

    if (!isImageCorrect(userPhotoFile)) {
      isImageCorrect(userPhotoFile);
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

  const toggleThumbs = () => {
    showThumbs ? setShowTumbs(false) : setShowTumbs(true);
  };
  const toggleResize = () => {
    showResizer ? setShowResizer(false) : setShowResizer(true);
  };
  const toggleZoom = () => {
    showZoom ? setShowZoom(false) : setShowZoom(true);
  };

  return (
    <div className={s.wrapper}>
      <Image
        src={userPhotos[0] || placeholder}
        className={s.image}
        alt={'User Photo'}
        layout="responsive"
        width={100}
        height={100}
      />

      <input
        type="file"
        accept="image/jpeg, image/png"
        id="photo-loading"
        ref={fileInputRef}
        className={s.input}
        onChange={uploadUserPhotoHandler}
      />
      <div className={s.btns}>
        <Button variant={'ghost'} onClick={toggleResize} className={s.resize}></Button>
        {showResizer && <ResizePhoto />}
        <Button variant={'ghost'} onClick={toggleZoom} className={s.zoom}></Button>
        {showZoom && <ZoomPhoto />}
        <Button variant={'ghost'} onClick={toggleThumbs} className={s.file}></Button>
        {showThumbs && (
          <Thumbs
            userPhotos={userPhotos}
            handleButtonClick={handleButtonClick}
            removeUserPhotoHandler={removeUserPhotoHandler}
          />
        )}
      </div>
    </div>
  );
};
