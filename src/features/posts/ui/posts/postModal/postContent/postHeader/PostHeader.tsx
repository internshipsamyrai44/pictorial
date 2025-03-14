'use client';

import s from './PostHeader.module.scss';
import PostModalMenuIcon from '../../../../../../../../public/icons/PostModalMenu.svg';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import PostMenu from './postMenu/PostMenu';
import { useState } from 'react';

type Props = {
  avatarOwner: string;
  userName: string;
  onDeletePost: () => void;
  onEditPost: () => void;
  isAuth?: boolean;
};

export default function PostHeader({ avatarOwner, userName, onDeletePost, onEditPost, isAuth }: Props) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const onMenuBtnClick = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <div className={s.header}>
      <div className={s.postOwner}>
        <ProfileAvatar src={avatarOwner} userName={userName} />
        <Typography as={'h3'} variant={'h3'}>
          {userName}
        </Typography>
      </div>
      {isAuth && (
        <div className={s.postModalMenu}>
          <div className={s.menuIcon}>
            <PostModalMenuIcon onClick={onMenuBtnClick} />
          </div>
          {menuIsOpen && (
          <PostMenu setMenuIsOpen={setMenuIsOpen} onEditClick={onEditPost} onDeleteClick={onDeletePost} />
          )}
        </div>
      )}
    </div>
  );
}
