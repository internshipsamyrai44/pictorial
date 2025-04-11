import React, { ChangeEvent, useRef } from 'react';
import { useChangeAvatarMutation } from '@/features/profile/api/profileApi';
import { Button, Modal, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';
import AvatarEditor from 'react-avatar-editor';

import s from './AddAvatarModal.module.scss';
import { EmptyAvatar } from '../../../../../../../public/icons/EmptyAvatar';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

type AddAvatarModalProps = {
  currentPhoto: File | null;
  error: string;
  // eslint-disable-next-line no-unused-vars
  setCurrentPhoto: (currentPhoto: File | null) => void;
  // eslint-disable-next-line no-unused-vars
  setError: (error: string) => void;
  // eslint-disable-next-line no-unused-vars
  setIsOpenAddPhotoModal: (value: boolean) => void;
};

export const AddAvatarModal = ({
  currentPhoto,
  error,
  setCurrentPhoto,
  setError,
  setIsOpenAddPhotoModal
}: AddAvatarModalProps) => {
  const editorRef = useRef<AvatarEditor>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [changeAvatar] = useChangeAvatarMutation();
  const t = useTranslations('Profile');

  // Открытие диалога выбора файла
  const selectAvatar = () => {
    inputRef.current?.click();
  };

  // Валидация файла: размер и тип
  const isValidFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      setError(t('AddAvatarModal.ErrorSize'));
      return false;
    }
    if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
      setError(t('AddAvatarModal.ErrorFormat'));
      return false;
    }
    return true;
  };

  // Обработка выбора файла
  const changeAvatarHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!isValidFile(file)) {
      e.target.value = '';
      return;
    }

    setError('');
    setCurrentPhoto(file);
  };

  // Промисифицированное получение blob из canvas
  const getCanvasBlob = (canvas: HTMLCanvasElement): Promise<Blob | null> => {
    return new Promise((resolve) => {
      canvas.toBlob((blob) => resolve(blob), 'image/png');
    });
  };

  // Сохранение аватара
  const saveAvatar = async () => {
    if (!editorRef.current) return;
    const canvas = editorRef.current.getImageScaledToCanvas();
    if (!canvas) return;

    const blob = await getCanvasBlob(canvas);
    if (!blob) return;

    const timestamp = Date.now();
    const fileName = `photo_${timestamp}.png`;
    const file = new File([blob], fileName, { type: 'image/png' });

    try {
      await changeAvatar({ file }).unwrap();
      setCurrentPhoto(null);
      setIsOpenAddPhotoModal(false);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      setError(errorMsg);
      console.error('Ошибка при изменении аватара:', err);
    }
  };

  return (
    <Modal className={s.root} onClose={() => setIsOpenAddPhotoModal(false)} title={t('AddAvatarModal.AddAvatar')}>
      <div className={s.content}>
        {currentPhoto ? (
          <>
            <AvatarEditor
              border={8}
              borderRadius={158}
              color={[23, 23, 23, 0.8]}
              height={340}
              image={currentPhoto}
              ref={editorRef}
              rotate={0}
              scale={1.2}
              width={330}
            />
            <Button className={s.saveButton} onClick={saveAvatar} variant="primary">
              {t('AddAvatarModal.SaveAvatar')}
            </Button>
          </>
        ) : (
          <div className={s.withoutAvatar}>
            {error && (
              <div className={s.errorText}>
                <Typography variant="bold-text-14">{error}</Typography>
              </div>
            )}
            <div className={s.emptyPic}>
              <EmptyAvatar height={36} width={36} />
            </div>

            <Button onClick={selectAvatar} variant="primary">
              {t('AddAvatarModal.AvatarSelect')}
            </Button>
          </div>
        )}
        <input
          accept="image/*" // упрощённое правило для изображений
          onChange={changeAvatarHandler}
          ref={inputRef}
          style={{ display: 'none' }}
          type="file"
        />
      </div>
    </Modal>
  );
};
