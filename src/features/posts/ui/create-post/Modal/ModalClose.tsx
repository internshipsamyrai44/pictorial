import s from '@/features/posts/ui/create-post/CreatePost.module.scss';
import { Button, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';
import { useCreatePostContext } from '@/shared/hooks/useCreatePostContext';

type PropsType = {
  // eslint-disable-next-line no-unused-vars
  setCreatePostActive: (value: boolean) => void;
};

export const ModalClose = (props: PropsType) => {
  const t = useTranslations('Post');
  const { setModalCloseActive } = useCreatePostContext();

  const { setCreatePostActive } = props;

  return (
    <Modal title={t('CreatePost.Close')} className={s.modal} onClose={() => setModalCloseActive(false)}>
      <p>{t('CreatePost.CloseDescription')} </p>
      <div className={s.btns}>
        <Button
          variant={'primary'}
          onClick={() => {
            setModalCloseActive(false);
          }}
        >
          {t('CreatePost.Discard')}
        </Button>
        <Button
          variant={'outlined'}
          onClick={() => {
            setCreatePostActive(false);
          }}
        >
          {t('CreatePost.SaveDraft')}
        </Button>
      </div>
    </Modal>
  );
};
