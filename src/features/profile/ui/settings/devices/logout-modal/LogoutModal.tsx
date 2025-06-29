import { Button, Modal, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';
import s from './LogoutModal.module.scss';

type LogoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  userEmail?: string;
};

export const LogoutModal = ({ isOpen, onClose, onConfirm, isLoading, userEmail }: LogoutModalProps) => {
  const t = useTranslations('Sessions');

  if (!isOpen) {
    return null;
  }

  return (
    <Modal title={t('LogOut')} className={s.logoutModal} onClose={onClose}>
      <Typography variant={'regular-text-16'} className={s.logoutModalText}>
        {t('LogOutConfirmation')}
        <Typography as={'span'} variant={'bold-text-16'}>
          {` " ${userEmail} " `}
        </Typography>
        ?
      </Typography>
      <div className={s.logoutModalButtons}>
        <Button className={s.logoutModalButton} variant={'outlined'} onClick={onConfirm} disabled={isLoading}>
          {t('Yes')}
        </Button>
        <Button className={s.logoutModalButton} onClick={onClose}>
          {t('No')}
        </Button>
      </div>
    </Modal>
  );
};
