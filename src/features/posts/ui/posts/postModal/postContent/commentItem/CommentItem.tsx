'use client';

import s from './CommentItem.module.scss';
import Heart from '../../../../../../../../public/icons/heart.svg';
import HeartOutline from '../../../../../../../../public/icons/HeartOutline';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';

type Props = {
  avatarSrc: string;
  userName: string;
  text: string;
  isLiked?: boolean;
  descriptionPost?: boolean;
};

export default function CommentItem({ avatarSrc, userName, text, isLiked, descriptionPost }: Props) {
  const t = useTranslations('Post');
  return (
    <div className={s.commentItem}>
      <div className={s.comment}>
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
              {t('Like')}:
            </Typography>
            <Typography variant={'small-text'} as={'span'}>
              {t('Answer')}
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
