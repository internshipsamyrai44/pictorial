import s from './AvatarActions.module.scss';
import Image from 'next/image';

import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import defaultPic from '././../../../../../../../public/icons/PicIcon.svg';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

export const AvatarActions = () => {
  const t = useTranslations('Profile');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <div className={s.container}>
      <div className={s.pic} onClick={handleButtonClick}>
        <Image src={defaultPic} alt={'User profile pic'} />
      </div>
      <input type="file" id="avatar-input" accept="image/*" ref={fileInputRef} className={s.input} />
      <Button variant={'outlined'} onClick={handleButtonClick}>
        {t('AddAProfilePhoto')}
      </Button>
    </div>
  );
};
