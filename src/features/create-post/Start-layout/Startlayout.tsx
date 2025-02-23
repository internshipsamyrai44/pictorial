import s from './StartLayot.module.scss';
import Image from 'next/image';
// eslint-disable-next-line import/no-unresolved
import defaultPic from '../../../../public/icons/PicIcon.svg';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import { Dispatch, SetStateAction, useRef } from 'react';

type PropsType = {
  setUserPhotos: Dispatch<SetStateAction<string[]>>;
  userPhotos: string[];
  // eslint-disable-next-line no-unused-vars
  handlePaginate: (action: 'next' | 'prev' | 'close') => void;
};
const MAX_SIZE = 5 * 1024 * 1024;
export const isImageCorrect = (image: File) => {
  if (!image) {
    return false;
  }
  if (image.size > MAX_SIZE) {
    alert('Please upload a file smaller than 20MB!');
    return false;
  }
  if (!image.type.startsWith('image/jpeg') && !image.type.startsWith('image/png')) {
    alert('Please upload JPEG or PNG image format!');
    return false;
  }
  return true;
};

export const Startlayout = (props: PropsType) => {
  const { setUserPhotos, handlePaginate } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const uploadUserPhotoHandler = (e: any) => {
    const userPhotoFile = e.target.files?.[0];
    if (isImageCorrect(userPhotoFile)) {
      const reader = new FileReader();
      handlePaginate('next');
      reader.onloadend = () => {
        if (reader.result) {
          setUserPhotos((prevPhotos) => [...prevPhotos, reader.result as string]);
        }
      };
      reader.readAsDataURL(userPhotoFile);
    } else {
      isImageCorrect(userPhotoFile);
      handlePaginate('prev');
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
        <Button variant={'outlined'} fullWidth={true}>
          Open Draft
        </Button>
      </div>
    </div>
  );
};
