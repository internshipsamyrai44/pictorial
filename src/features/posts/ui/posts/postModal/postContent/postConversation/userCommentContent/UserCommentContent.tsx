'use client';

import s from './UserCommentContent.module.scss';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';

type Props = {
  avatarSrc: string | undefined;
  userName: string;
  text: string;
};

export default function UserCommentContent({ avatarSrc, userName, text }: Props) {
  return (
    <div className={s.comment}>
      <ProfileAvatar src={avatarSrc} height={36} width={36} userName={userName} />
      <Typography variant={'regular-text-14'}>
        <b>{userName}</b> {text}
      </Typography>
    </div>
  );
}
