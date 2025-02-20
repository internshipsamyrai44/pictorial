import s from './CreatePost.module.scss';
import { Button, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import * as React from 'react';
import defaultPic from '../../../public/icons/PicIcon.svg';
import Image from 'next/image';
import { useRef } from 'react';

type PropsType = {
  // eslint-disable-next-line no-unused-vars
  setCreatePostActive: (value: boolean) => void;
};

export const CreatePost = (props: PropsType) => {
  const { setCreatePostActive } = props;
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Modal title={'Add Photo'} className={s.wrapper} onClose={() => setCreatePostActive(false)}>
      <div className={s.image} onClick={handleButtonClick}>
        <Image src={defaultPic} alt={'Default Photo'} />
      </div>
      <input type="file" accept="image/jpeg, image/png" id="photo-loading" ref={fileInputRef} className={s.input} />
      <Button variant={'primary'} onClick={handleButtonClick}>
        Select from Computer
      </Button>
      <Button
        variant={'outlined'}
        onClick={() => {
          console.log('Open Draft');
        }}
      >
        Open Draft
      </Button>
    </Modal>
  );
};
