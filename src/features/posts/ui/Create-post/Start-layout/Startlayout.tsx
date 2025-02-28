import s from './StartLayot.module.scss';
import Image from 'next/image';
import defaultPic from '../../../../../../public/icons/PicIcon.svg';
import { Button, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import { Dispatch, SetStateAction, useRef } from 'react';
import { useCheckUploadedImage } from '@/shared/hooks/useCheckUploadedImage';

type PropsType = {
  setUserPhotos: Dispatch<SetStateAction<string[]>>;
  userPhotos: string[];
  // eslint-disable-next-line no-unused-vars
  paginate: (action: 'next' | 'prev' | 'close') => void;
};

export const Startlayout = (props: PropsType) => {
  const { setUserPhotos, paginate } = props;
  const { isImageCorrect, errorUploadModal, setErrorUploadModal } = useCheckUploadedImage();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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
    paginate('next');
    reader.onloadend = () => {
      if (reader.result) {
        setUserPhotos((prevPhotos) => [...prevPhotos, reader.result as string]);
      }
    };
    reader.readAsDataURL(userPhotoFile);
  };

  return (
    <>
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
        <div className={s.buttons}>
          <Button variant={'primary'} onClick={handleButtonClick}>
            Select from Computer
          </Button>
          <Button variant={'outlined'} fullWidth={true}>
            Open Draft
          </Button>
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
