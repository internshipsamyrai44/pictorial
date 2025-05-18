'use client';

import s from './FeedPostItem.module.scss';
import { ProfileAvatar } from '@/shared/ui/profile-avatar/ProfileAvatar';
import { PublishedPostResponse } from '@/features/posts/model/postsApi.types';
import Image from 'next/image';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';
import { useTranslations } from 'next-intl';
import { useUpdateLikeStatusPostMutation } from '@/features/posts/api/postsApi';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Импортируем иконки
import { BookmarkOutline } from './icons/BookmarkOutline';
import { CommentOutline } from './icons/CommentOutline';

type FeedPostItemProps = {
  post: PublishedPostResponse;
};

const FeedPostItem = ({ post }: FeedPostItemProps) => {
  const t = useTranslations('Post');
  const router = useRouter();
  const [liked, setLiked] = useState(post.isLiked);
  const [likesCount, setLikesCount] = useState(post.likesCount);

  const [updateLikeStatus] = useUpdateLikeStatusPostMutation();

  const handleLikeToggle = async () => {
    const newLikeStatus = !liked;
    setLiked(newLikeStatus);
    setLikesCount((prevCount) => (newLikeStatus ? prevCount + 1 : prevCount - 1));

    try {
      await updateLikeStatus({
        postId: post.id,
        likeStatus: newLikeStatus ? 'Like' : 'None'
      }).unwrap();
    } catch (error) {
      // Восстанавливаем состояние при ошибке
      setLiked(!newLikeStatus);
      setLikesCount((prevCount) => (!newLikeStatus ? prevCount + 1 : prevCount - 1));
    }
  };

  const formatDate = (date: string) => {
    const locale = t('dateFormat') === 'ru-RU' ? ru : enUS;
    return formatDistanceToNow(new Date(date), { addSuffix: true, locale });
  };

  const openPostDetail = () => {
    router.push(`/profile/${post.ownerId}/${post.id}`);
  };

  const goToComments = () => {
    router.push(`/profile/${post.ownerId}/${post.id}?openComments=true`);
  };

  return (
    <div className={s.feedPostItem}>
      <div className={s.postHeader}>
        <Link href={`/profile/${post.ownerId}`} className={s.userInfo}>
          <ProfileAvatar src={post.avatarOwner} userName={post.userName} height={36} width={36} />
          <div className={s.userNameContainer}>
            <div className={s.userName}>{post.userName}</div>
          </div>
        </Link>
        <div className={s.postTime}>• {formatDate(post.createdAt)}</div>
        <button className={s.moreButton}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div className={s.postImage} onClick={openPostDetail}>
        {post.images && post.images.length > 0 && (
          <Image
            src={post.images[0].url}
            alt={`Post by ${post.userName}`}
            width={600}
            height={600}
            style={{ objectFit: 'cover', width: '100%', height: 'auto', cursor: 'pointer' }}
          />
        )}
      </div>

      {post.images && post.images.length > 1 && (
        <div className={s.imageIndicators}>
          {post.images.map((_, index) => (
            <span key={index} className={index === 0 ? s.activeIndicator : s.indicator}></span>
          ))}
        </div>
      )}

      <div className={s.postActions}>
        <div className={s.leftActions}>
          <button className={s.actionButton} onClick={handleLikeToggle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={liked ? 'var(--danger-500)' : 'none'}
              stroke={liked ? 'var(--danger-500)' : 'currentColor'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={liked ? s.likedIcon : s.likeIcon}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button className={s.actionButton} onClick={goToComments}>
            <CommentOutline className={s.commentIcon} />
          </button>
          <button className={s.actionButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className={s.rightActions}>
          <button className={s.actionButton}>
            <BookmarkOutline className={s.bookmarkIcon} />
          </button>
        </div>
      </div>

      <div className={s.likesCount}>
        {likesCount > 0 && (
          <span className={s.likeCount}>
            {likesCount} {t('Like')}
          </span>
        )}
      </div>

      <div className={s.postContent}>
        <Link href={`/profile/${post.ownerId}`} className={s.postUserName}>
          {post.userName}
        </Link>
        <span className={s.postDescription}>{post.description}</span>
      </div>

      <div className={s.commentsSection}>
        <button className={s.viewComments} onClick={goToComments}>
          {t('ViewAllComments')}
        </button>
        <div className={s.addComment}>
          <input type="text" placeholder={t('AddComment')} className={s.commentInput} />
          <button className={s.publishButton}>{t('Publish')}</button>
        </div>
      </div>
    </div>
  );
};

export default FeedPostItem;
