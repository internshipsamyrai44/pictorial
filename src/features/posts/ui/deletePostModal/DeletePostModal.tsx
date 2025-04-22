import { Button, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import React, { useEffect, useState } from 'react';
import s from './DeletePostModal.module.scss';
import { useTranslations } from 'next-intl';
import { useDeletePostMutation } from '@/features/posts/api/postsApi';

type DeletePostModalProps = {
  id: number;
  isOpen: boolean;
  onModalClose: () => void;
};

export const DeletePostModal: React.FC<DeletePostModalProps> = ({ id, isOpen, onModalClose }) => {
  const [open, setOpen] = useState(isOpen);
  const t = useTranslations('Post');

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const [deletePost, { isLoading, isSuccess, isError }] = useDeletePostMutation();

  useEffect(() => {
    if (isSuccess) {
      onModalClose();
    }
    if (isError) {
      // TODO alert?
      console.error('Error deleting post');
    }
  }, [isSuccess, isError]);

  const handleDelete = () => {
    deletePost(id);
  };

  return (
    <>
      {open && (
        <Modal className={s.modal} title={t('Delete.Post')} onClose={onModalClose}>
          <div className={s.modalText}>{t('Delete.Sure?')}</div>
          <div className={s.modalButtons}>
            <Button onClick={handleDelete} variant="outlined" disabled={isLoading}>
              {t('Yes')}
            </Button>
            <Button onClick={onModalClose} disabled={isLoading}>
              {t('No')}
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};
