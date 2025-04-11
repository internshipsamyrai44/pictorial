import s from './AvatarActions.module.scss';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import Close from '../../../../../../../public/icons/Close';
import { DeleteAvatarModal } from '@/features/profile/ui/settings/general-info/deleteAvatarModal/DeleteAvatarModal';
import { AddAvatarModal } from '@/features/profile/ui/settings/general-info/addAvatarModal/AddAvatarModal';

``;

type AvatarActionsProps = {
  avatar?: string;
  userName?: string;
};

export const AvatarActions = ({ avatar, userName = '' }: AvatarActionsProps) => {
  const t = useTranslations('Profile');

  const [currentPhoto, setCurrentPhoto] = useState<File | null>(null);
  const [isOpenAddPhotoModal, setIsOpenAddPhotoModal] = useState(false);
  const [isOpenDeletePhotoModal, setIsOpenDeletePhotoModal] = useState(false);
  const [error, setError] = useState('');

  const openAddPhotoModalHandler = () => {
    setError('');
    setCurrentPhoto(null);
    setIsOpenAddPhotoModal(true);
  };

  const openDeletePhotoModalHandler = () => {
    setIsOpenDeletePhotoModal(true);
  };

  return (
    <div className={s.container}>
      <div className={s.pic}>
        {avatar && (
          <Button className={s.deleteIcon} variant={'ghost'} onClick={openDeletePhotoModalHandler}>
            <Close />
          </Button>
        )}
        <ProfileAvatar height={204} src={avatar} width={204} userName={userName} />
      </div>
      <Button variant={'outlined'} onClick={openAddPhotoModalHandler}>
        {t('AddAProfilePhoto')}
      </Button>
      {isOpenAddPhotoModal && (
        <AddAvatarModal
          currentPhoto={currentPhoto}
          error={error}
          setCurrentPhoto={setCurrentPhoto}
          setError={setError}
          setIsOpenAddPhotoModal={setIsOpenAddPhotoModal}
        />
      )}
      {isOpenDeletePhotoModal && <DeleteAvatarModal onClose={setIsOpenDeletePhotoModal} />}
    </div>
  );
};
