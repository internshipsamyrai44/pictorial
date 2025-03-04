'use client';

import s from './PostHeader.module.scss';
import PostModalMenuIcon from '../../../../../../../../public/icons/PostModalMenu.svg';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';

type Props = {
  avatarOwner: string;
  userName: string;
};

export default function PostHeader({ avatarOwner, userName }: Props) {
  return (
    <div className={s.header}>
      <div className={s.postOwner}>
        <ProfileAvatar src={avatarOwner} userName={userName} />
        <Typography as={'h3'} variant={'h3'}>
          {userName}
        </Typography>
      </div>
      <div className={s.postModalMenu}>
        <PostModalMenuIcon />
      </div>
    </div>
  );
}
