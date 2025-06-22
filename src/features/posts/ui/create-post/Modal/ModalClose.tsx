import s from '@/features/posts/ui/create-post/CreatePost.module.scss';
import { Button, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';
import { useCreatePostContext } from '@/shared/hooks/useCreatePostContext';
import { usePostDraft } from '@/shared/hooks/usePostDraft';
import { useState } from 'react';

type PropsType = {
  // eslint-disable-next-line no-unused-vars
  setCreatePostActive: (value: boolean) => void;
  textAreaValue: string;
};

export const ModalClose = (props: PropsType) => {
  const t = useTranslations('Post');
  const { setModalCloseActive, userPhotos, page } = useCreatePostContext();
  const { savePostDraft } = usePostDraft();
  const { setCreatePostActive, textAreaValue } = props;
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveDraft = async () => {
    try {
      await savePostDraft(userPhotos, textAreaValue, page);
      setIsSaved(true);

      // Таймаут для закрытия модаллки
      setTimeout(() => {
        setCreatePostActive(false);
      }, 1500);
    } catch (error) {
      console.error('Error saving draft:', error);
      setCreatePostActive(false);
    }
  };

  const handleDiscard = () => {
    setModalCloseActive(false);
    setCreatePostActive(false);
  };

  return (
    <Modal title={t('CreatePost.Close')} className={s.modal} onClose={() => setModalCloseActive(false)}>
      {isSaved ? (
        <div className={s.savedMessage}>
          <p>{t('CreatePost.DraftSaved')}</p>
        </div>
      ) : (
        <>
          <p>{t('CreatePost.CloseDescription')} </p>
          <div className={s.btns}>
            <Button variant={'primary'} onClick={handleDiscard}>
              {t('CreatePost.Discard')}
            </Button>
            <Button variant={'outlined'} onClick={handleSaveDraft}>
              {t('CreatePost.SaveDraft')}
            </Button>
          </div>
        </>
      )}
    </Modal>
  );
};
