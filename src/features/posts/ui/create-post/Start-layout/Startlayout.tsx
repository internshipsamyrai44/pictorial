import s from './StartLayot.module.scss';
import FileIcon from '../../../../../../public/icons/PicIcon.svg';
import { Button, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import { useRef } from 'react';
import { useCheckUploadedImage } from '@/shared/hooks/useCheckUploadedImage';
import { useTranslations } from 'next-intl';
import { useCreatePostContext } from '@/shared/hooks/useCreatePostContext';

type PropsType = {
  // eslint-disable-next-line no-unused-vars
  paginate: (action: 'next' | 'prev' | 'close') => void;
};

export const Startlayout = (props: PropsType) => {
  const { setUserPhotos } = useCreatePostContext();

  const { paginate } = props;
  const { isImageCorrect, errorUploadModal, setErrorUploadModal } = useCheckUploadedImage();
  const t = useTranslations('Post');
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
        setUserPhotos((prevPhotos: string[]) => [...prevPhotos, reader.result as string]);
      }
    };
    reader.readAsDataURL(userPhotoFile);
  };

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.image} onClick={handleButtonClick}>
          <FileIcon width={48} height={48} />
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
            {t('CreatePost.SelectFromComputer')}
          </Button>
          <Button variant={'outlined'} fullWidth={true}>
            {t('CreatePost.OpenDraft')}
          </Button>
        </div>
      </div>
      {errorUploadModal && (
        <Modal title={t('CreatePost.ErrorUpload')} className={s.modal} onClose={() => setErrorUploadModal(false)}>
          {t('CreatePost.ErrorUploadDescription')}
          <div className={s.modalBtn}>
            <Button variant={'primary'} onClick={() => setErrorUploadModal(false)}>
              {t('CreatePost.TryAgain')}
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};
