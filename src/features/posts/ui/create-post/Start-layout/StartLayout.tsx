import s from './StartLayot.module.scss';
import FileIcon from '../../../../../../public/icons/PicIcon.svg';
import { Button, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import { useRef, useState, useEffect } from 'react';
import { useUploadUserPhotoPreview } from '@/shared/hooks/useUploadUserPhotoPreview';
import { useTranslations } from 'next-intl';
import { useCreatePostContext } from '@/shared/hooks/useCreatePostContext';
import { usePostDraft } from '@/shared/hooks/usePostDraft';

type PropsType = {
  // eslint-disable-next-line no-unused-vars
  setTextAreaValue: (value: string) => void;
};

export const StartLayout = ({ setTextAreaValue }: PropsType) => {
  const { uploadUserPhotoPreview, errorUploadModal, setErrorUploadModal } = useUploadUserPhotoPreview();
  const { paginate, setUserPhotos, setPage } = useCreatePostContext();
  const { loadPostDraft } = usePostDraft();
  const t = useTranslations('Post');
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDraftAvailable, setIsDraftAvailable] = useState<boolean>(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const checkDraft = async () => {
      try {
        const draft = await loadPostDraft();
        setIsDraftAvailable(Boolean(draft && draft.userPhotos.length > 0));
      } catch (error) {
        console.error('Error checking draft:', error);
        setIsDraftAvailable(false);
      }
    };

    void checkDraft();
  }, [loadPostDraft]);

  const handleOpenDraft = async () => {
    try {
      const draft = await loadPostDraft();
      if (draft && draft.userPhotos.length > 0) {
        setUserPhotos(draft.userPhotos);
        setTextAreaValue(draft.textAreaValue);
        setPage(draft.page);
        if (draft.page === 0) {
          paginate('next');
        }
      }
    } catch (error) {
      console.error('Error loading draft:', error);
    }
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
          <Button variant={'outlined'} fullWidth={true} onClick={handleOpenDraft} disabled={!isDraftAvailable}>
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
