import Image from 'next/image';
import * as React from 'react';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './Cropping.module.scss';
import placeholder from '../../../../public/images/photo-placeholder.png';
import { useRef } from 'react';
import { isImageCorrect } from '@/widgets/create-post/Start-layout/Startlayout';

type PropsType = {
  userPhotos: string[];
  // eslint-disable-next-line no-unused-vars
  setUserPhotos: React.Dispatch<React.SetStateAction<string[]>>;
};

export const Cropping = (props: PropsType) => {
  const { userPhotos, setUserPhotos } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showThumbs, setShowTumbs] = React.useState(false);

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
      <div className={`${s.thumblist} ${showThumbs ? '' : s.hidden}`}>
        <div className={s.thumbnails}>
          {userPhotos.map((photo, i) => (
            <Image key={`photo-${i}`} src={photo || placeholder} alt={'User Photo'} width={100} height={100} />
          ))}
        </div>
        <Button
          variant={'ghost'}
          onClick={handleButtonClick}
          disabled={userPhotos.length >= 10}
          className={s.add}
        ></Button>
      </div>
    </div>
  );
};
