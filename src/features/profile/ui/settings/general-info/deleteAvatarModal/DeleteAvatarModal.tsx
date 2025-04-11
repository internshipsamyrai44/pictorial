import { useDeleteAvatarMutation } from '@/features/profile/api/profileApi';
import { Button, Modal, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';

import s from './DeleteAvatarModal.module.scss';

type Props = {
  // eslint-disable-next-line no-unused-vars
  onClose: (value: boolean) => void;
};

export const DeleteAvatarModal = ({ onClose }: Props) => {
  const [deleteAvatar] = useDeleteAvatarMutation();
  const t = useTranslations('Profile');

  const deletePhoto = async () => {
    try {
      await deleteAvatar().unwrap();
      onClose(false);
    } catch (error) {
      console.error('Ошибка при удалении аватара:', error);
    }
  };

  return (
    <Modal className={s.modal} onClose={() => onClose(false)} title={t('DeleteAvatarModal.DeleteAvatarTitle')}>
      <Typography variant="regular-text-16" className={s.text}>
        {t('DeleteAvatarModal.DeleteAvatar')}
      </Typography>
      <div className={s.buttonsBlock}>
        <Button className={s.modalButton} onClick={deletePhoto} variant="outlined">
          {t('DeleteAvatarModal.ConfirmButton')}
        </Button>
        <Button className={s.modalButton} onClick={() => onClose(false)} variant="primary">
          {t('DeleteAvatarModal.RejectButton')}
        </Button>
      </div>
    </Modal>
  );
};
