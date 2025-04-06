import { Button, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';
import s from './ClosePostModal.module.scss';
type Props = {
  isOpen: boolean;
  onConfirm?: () => void;
  closeModal?: () => void;
};

export const ClosePostModal = ({ isOpen, onConfirm, closeModal }: Props) => {
  const t = useTranslations('Post');

  if (!isOpen) return null;
  return (
    <Modal onClose={closeModal} title={t('ClosePost.ClosePost')}>
      <p className={s.sureText}>{t('ClosePost.Sure?')}</p>
      <div className={s.buttons}>
        <Button variant="outlined" onClick={onConfirm}>
          {t('Yes')}
        </Button>
        <Button onClick={closeModal}>{t('No')}</Button>
      </div>
    </Modal>
  );
};
