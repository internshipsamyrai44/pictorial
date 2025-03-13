'use client';

import s from './InteractionBlock.module.scss';
import BookmarkOutline from '../../../../../../../../public/icons/bookmarkOutline.svg';
import PaperPlaneOutline from '../../../../../../../../public/icons/paperPlaneOutline.svg';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { PublishedPostResponse } from '@/features/posts/model/postsApi.types';
import HeartOutline from '../../../../../../../../public/icons/HeartOutline';
import { useTranslations } from 'next-intl';

type Props = {
  post: PublishedPostResponse;
  isAuth?: boolean;
};

export default function InteractionBlock({ post, isAuth }: Props) {
  const t = useTranslations('Post');
  const date = new Date(post.createdAt);
  const formattedDate = date.toLocaleDateString(t('dateFormat'), {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className={s.interactionBlock}>
      {isAuth && (
        <div className={s.interaction}>
          <div className={s.iconsGroup}>
            <HeartOutline width={24} height={24} />
            <PaperPlaneOutline />
          </div>
          <BookmarkOutline />
        </div>
      )}
      <div className={s.postLikes}>
        {post.avatarWhoLikes}
        <div className={s.likes}>
          <Typography variant={'regular-text-14'}>{post.likesCount}</Typography>
          <Typography variant={'bold-text-14'}> &quot;{t('Like')}&quot;</Typography>
        </div>
      </div>
      <div>
        <Typography variant={'small-text'} className={s.data}>
          {formattedDate}
        </Typography>
      </div>
    </div>
  );
}
