import { Button, Modal, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';
import s from './LogoutModal.module.scss';

type LogoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  userEmail?: string;
  title?: string;
  message?: string;
  deviceInfo?: string;
};

export const LogoutModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  userEmail,
  title,
  message,
  deviceInfo
}: LogoutModalProps) => {
  const t = useTranslations('Sessions');

  // Раннее возвращение, если модальное окно не открыто
  if (!isOpen) {
    return null;
  }

  const modalTitle = title || t('LogOut');
  const modalMessage = message || t('LogOutConfirmation');
  const showQuestionMark = Boolean(userEmail || deviceInfo);

  return (
    <Modal title={modalTitle} className={s.logoutModal} onClose={onClose}>
      <Typography variant={'regular-text-16'} className={s.logoutModalText}>
        {modalMessage}
        {userEmail && (
          <Typography as={'span'} variant={'bold-text-16'}>
            {` " ${userEmail} " `}
          </Typography>
        )}
        {deviceInfo && (
          <Typography as={'span'} variant={'bold-text-16'}>
            {` ${deviceInfo} `}
          </Typography>
        )}
        {showQuestionMark && '?'}
      </Typography>
      <div className={s.logoutModalButtons}>
        <Button
          className={s.logoutModalButton}
          variant={'outlined'}
          onClick={onConfirm}
          disabled={isLoading}
          data-testid="confirm-button"
        >
          {t('Yes')}
        </Button>
        <Button className={s.logoutModalButton} onClick={onClose} data-testid="cancel-button">
          {t('No')}
        </Button>
      </div>
    </Modal>
  );
};
