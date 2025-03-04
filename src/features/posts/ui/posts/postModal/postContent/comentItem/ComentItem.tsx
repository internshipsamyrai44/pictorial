'use client';

import s from './ComentItem.module.scss';
import Heart from '../../../../../../../../public/icons/heart.svg';
import HeartOutline from '../../../../../../../../public/icons/HeartOutline';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';

type Props = {
  avatarSrc: string;
  userName: string;
  text: string;
  isLiked?: boolean;
  descriptionPost?: boolean;
};

export default function ComentItem({ avatarSrc, userName, text, isLiked, descriptionPost }: Props) {
  return (
    <div className={s.comentItem}>
      <div className={s.coment}>
        <ProfileAvatar src={avatarSrc} height={36} width={36} userName={userName} />
        <div>
          <Typography variant={'regular-text-14'}>
            <b>{userName}</b> {text}
          </Typography>
          <div className={s.interaction}>
            <Typography variant={'small-text'} as={'span'}>
              data
            </Typography>
            <Typography variant={'small-text'} as={'span'}>
              Like:
            </Typography>
            <Typography variant={'small-text'} as={'span'}>
              Answer
            </Typography>
          </div>
        </div>
      </div>
      <div className={s.like}>
        {!descriptionPost ? <>{isLiked ? <Heart /> : <HeartOutline width={16} height={16} />}</> : <></>}
      </div>
    </div>
  );
}
