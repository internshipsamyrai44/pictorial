import Image from 'next/image';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './Cropping.module.scss';
import placeholder from '../../../../public/images/photo-placeholder.png';
import { Dispatch, SetStateAction, useRef, useState } from 'react';
import { isImageCorrect } from '@/features/create-post/Start-layout/Startlayout';
import { Thumbs } from '@/features/create-post/Thumbs/Thumbs';

type PropsType = {
  userPhotos: string[];
  // eslint-disable-next-line no-unused-vars
  setUserPhotos: Dispatch<SetStateAction<string[]>>;
};

export const Cropping = (props: PropsType) => {
  const { userPhotos, setUserPhotos } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showThumbs, setShowTumbs] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const uploadUserPhotoHandler = (e: any) => {
    const userPhotoFile = e.target.files?.[0];
    if (isImageCorrect(userPhotoFile)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setUserPhotos((prevPhotos) => [...prevPhotos, reader.result as string]);
        }
      };
      reader.readAsDataURL(userPhotoFile);
    } else {
      isImageCorrect(userPhotoFile);
    }
  };

  const removeUserPhotoHandler = (photoIndex: number) => {
    setUserPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== photoIndex));
  };

  const toggleThumbs = () => {
    showThumbs ? setShowTumbs(false) : setShowTumbs(true);
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
      <Button variant={'ghost'} onClick={toggleThumbs} className={s.btn}></Button>
      {showThumbs && (
        <Thumbs
          userPhotos={userPhotos}
          handleButtonClick={handleButtonClick}
          removeUserPhotoHandler={removeUserPhotoHandler}
        />
      )}
    </div>
  );
};
