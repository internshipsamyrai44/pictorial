import s from './CreatePost.module.scss';
import { Button, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import * as React from 'react';
import defaultPic from '../../../public/icons/PicIcon.svg';
import Image from 'next/image';
import { ChangeEvent, useRef, useState } from 'react';

type PropsType = {
  // eslint-disable-next-line no-unused-vars
  setCreatePostActive: (value: boolean) => void;
};
export const CreatePost = (props: PropsType) => {
  const { setCreatePostActive } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const MAX_SIZE = 20 * 1024 * 1024;

  const imageCheck = (file: File) => {
    if (file.size > MAX_SIZE) {
      alert('Please upload a file smaller than 20MB!');
      return;
    }
    if (!file.type.startsWith('image/jpeg') && !file.type.startsWith('image/png')) {
      alert('Please upload JPEG or PNG image format!');
      return;
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const uploadUserPhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const userPhotoFile = e.target.files?.[0];

    if (userPhotoFile) {
      imageCheck(userPhotoFile as File);

      const reader = new FileReader();
      reader.onerror = () => {
        alert(`Uploading file Error! ${reader.error}`);
      };

      reader.onloadend = () => {
        if (reader.result) {
          setUserPhoto(reader.result as string);
        }
      };
      reader.readAsDataURL(userPhotoFile);
    }
  };

  return (
    <Modal
      title={`${userPhoto ? 'Cropping' : 'Add Photo'} `}
      className={s.wrapper}
      onClose={() => setCreatePostActive(false)}
    >
      {userPhoto ? (
        <Image src={userPhoto} alt={'User Photo'} layout="responsive" width={100} height={100} />
      ) : (
        <div className={s.image} onClick={handleButtonClick}>
          <Image src={defaultPic} alt={'Default Photo'} />
        </div>
      )}

      <input
        type="file"
        accept="image/jpeg, image/png"
        id="photo-loading"
        ref={fileInputRef}
        className={s.input}
        onChange={uploadUserPhotoHandler}
      />
      <div className={`${s.buttons} ${userPhoto ? s.hidden : ''}`}>
        <Button variant={'primary'} onClick={handleButtonClick}>
          Select from Computer
        </Button>
        `<Button variant={'outlined'}>Open Draft</Button>
      </div>
    </Modal>
  );
};
