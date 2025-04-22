import s from './StartLayot.module.scss';
import FileIcon from '../../../../../../public/icons/PicIcon.svg';
import { Button, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import { useRef } from 'react';
import { useUploadUserPhotoPreview } from '@/shared/hooks/useUploadUserPhotoPreview';
import { useTranslations } from 'next-intl';
import { useCreatePostContext } from '@/shared/hooks/useCreatePostContext';

export const Startlayout = () => {
  const { uploadUserPhotoPreview, errorUploadModal, setErrorUploadModal } = useUploadUserPhotoPreview();
  const { paginate } = useCreatePostContext();
  const t = useTranslations('Post');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
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
          onChange={(e) => {
            uploadUserPhotoPreview(e);
            paginate('next');
          }}
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
