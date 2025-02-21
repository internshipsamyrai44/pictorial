import s from './StartLayot.module.scss';
import Image from 'next/image';
// eslint-disable-next-line import/no-unresolved
import defaultPic from '../../../../public/icons/PicIcon.svg';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import * as React from 'react';
import { useRef } from 'react';

type PropsType = {
  // eslint-disable-next-line no-unused-vars
  setUserPhoto: (photo: string | null) => void;
  userPhoto: string | null;
  // eslint-disable-next-line no-unused-vars
  setPage: (page: number) => void;
};

export const Startlayout = (props: PropsType) => {
  const { setUserPhoto, setPage } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const uploadUserPhotoHandler = (e: any) => {
    const userPhotoFile = e.target.files?.[0];
    if (userPhotoFile) {
      const reader = new FileReader();
      setPage(0);
      reader.onloadend = () => {
        if (reader.result) {
          setUserPhoto(reader.result as string);
        }
      };
      reader.readAsDataURL(userPhotoFile);
    }
  };
  return (
    <div className={s.wrapper}>
      <div className={s.image} onClick={handleButtonClick}>
        <Image src={defaultPic} alt={'Default Photo'} />
      </div>
      <input
        type="file"
        accept="image/jpeg, image/png"
        id="photo-loading"
        ref={fileInputRef}
        className={s.input}
        onChange={uploadUserPhotoHandler}
      />
      <div className={`${s.buttons}`}>
        <Button variant={'primary'} onClick={handleButtonClick}>
          Select from Computer
        </Button>
        <Button variant={'outlined'}>Open Draft</Button>
      </div>
    </div>
  );
};
