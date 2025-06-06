'use client';

import s from './InteractionBlock.module.scss';
import BookmarkOutline from '../../../../../../../../public/icons/bookmarkOutline.svg';
import PaperPlaneOutline from '../../../../../../../../public/icons/paperPlaneOutline.svg';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { PublishedPostResponse } from '@/features/posts/model/postsApi.types';
import HeartOutline from '../../../../../../../../public/icons/HeartOutline';
import HeartFilled from '../../../../../../../../public/icons/HeartLike';
import { useTranslations } from 'next-intl';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import { useFormattedDate } from '@/shared/hooks/useFormattedDate';
import { useGetPostLikesQuery, useUpdateLikeStatusPostMutation } from '@/features/posts/api/postsApi';
import { KeyboardEvent, useEffect, useState } from 'react';
import { useMeQuery } from '@/features/auth/api/authApi';

type Props = {
  post: PublishedPostResponse;
  isAuth?: boolean;
};

export default function InteractionBlock({ post, isAuth }: Props) {
  const t = useTranslations('Post');
  const formatDate = useFormattedDate();
  const { data: likesData, isLoading } = useGetPostLikesQuery({ postId: post.id }, { skip: !isAuth });
  const { data: userData } = useMeQuery(undefined, { skip: !isAuth });
  const [updateLikeStatus] = useUpdateLikeStatusPostMutation();
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState<number | null>(null);

  useEffect(() => {
    if (likesData?.totalCount !== undefined) {
      setLikesCount(likesData.totalCount);
    } else if (post.likesCount !== undefined) {
      setLikesCount(post.likesCount);
    }
  }, [likesData?.totalCount, post.likesCount]);

  useEffect(() => {
    if (userData?.userId && likesData?.items) {
      const hasUserLiked = likesData.items.some((like) => like.userId === userData.userId);
      setIsLiked(hasUserLiked);
    }
  }, [likesData?.items, userData?.userId]);

  const handleLikeClick = async () => {
    if (!isAuth) return;

    try {
      const newIsLiked = !isLiked;
      setIsLiked(newIsLiked);

      if (likesCount !== null) {
        setLikesCount((prev) => (prev !== null ? prev + (newIsLiked ? 1 : -1) : prev));
      }

      // запрос на сервер
      const newLikeStatus = newIsLiked ? 'LIKE' : 'NONE';
      await updateLikeStatus({ postId: post.id, likeStatus: newLikeStatus });
    } catch (error) {
      console.error('Error updating like status:', error);

      // откат в случае ошибки
      setIsLiked(!isLiked);
      if (likesCount !== null) {
        // счетчик к предыдущему значению
        setLikesCount((prev) => (prev !== null ? prev + (isLiked ? 1 : -1) : prev));
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      void handleLikeClick();
    }
  };

  const displayLikesCount =
    likesCount !== null ? likesCount : isLoading ? '...' : (likesData?.totalCount ?? post.likesCount);

  return (
    <div className={s.interactionBlock}>
      {isAuth && (
        <div className={s.interaction}>
          <div className={s.iconsGroup}>
            <span
              className={s.iconButton}
              onClick={() => void handleLikeClick()}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              role="button"
              aria-label={t('Like')}
            >
              {isLiked ? <HeartFilled width={24} height={24} /> : <HeartOutline width={24} height={24} />}
            </span>
            <span>
              <PaperPlaneOutline />
            </span>
          </div>
          <span>
            <BookmarkOutline />
          </span>
        </div>
      )}
      <div className={s.postLikes}>
        {likesData?.items
          .slice(-3)
          .reverse()
          .map((items) => {
            const lastAvatar = items.avatars?.[items.avatars.length - 1]?.url;
            return (
              <div key={items.id} className={s.avatarWrapper}>
                <ProfileAvatar src={lastAvatar} userName={post.userName} />
              </div>
            );
          })}
        <div className={s.likes}>
          <Typography variant={'regular-text-14'}>{displayLikesCount}</Typography>
          <Typography variant={'bold-text-14'}> &quot;{t('Like')}&quot;</Typography>
        </div>
      </div>
      <div>
        <Typography variant={'small-text'} className={s.data}>
          {formatDate(post.updatedAt)}
        </Typography>
      </div>
    </div>
  );
}
