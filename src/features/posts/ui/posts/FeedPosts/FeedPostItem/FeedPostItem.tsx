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
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import More from '../../../../../../../public/icons/more.svg';
import HeartOutline from '../../../../../../../public/icons/heart-outline.svg';
import ShareOutline from '../../../../../../../public/icons/share-outline.svg';

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
          <More />
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
            <HeartOutline className={liked ? s.likedIcon : s.likeIcon} />
          </button>
          <button className={s.actionButton} onClick={goToComments}>
            <CommentOutline className={s.commentIcon} />
          </button>
          <button className={s.actionButton}>
            <ShareOutline />
          </button>
        </div>
        <div className={s.rightActions}>
          <button className={s.actionButton}>
            <BookmarkOutline className={s.bookmarkIcon} />
          </button>
        </div>
      </div>

      <div className={s.postContent}>
        <Image src={post.avatarOwner} alt="avatar" width={36} height={36} className={s.postUserAvatar} />
        <p>
          <Link href={`/profile/${post.ownerId}`} className={s.postUserName}>
            {post.userName}
          </Link>{' '}
          <span className={s.postDescription}>{post.description}</span>
        </p>
      </div>

      <div className={s.likesCountContainer}>
        <div className={s.likesAuthorsImagesContainer}>
          {post.avatarWhoLikes.slice(0, 3).map((avatar) => (
            <Image src={avatar} alt="avatar" width={24} height={24} key={avatar} className={s.likesAuthorImage} />
          ))}
        </div>
        {likesCount > 0 && (
          <span className={s.likeCount}>
            {likesCount} {t('Like')}
          </span>
        )}
      </div>

      <div className={s.commentsSection}>
        <button className={s.viewComments} onClick={goToComments}>
          {t('ViewAllComments')}
        </button>
        <div className={s.addComment}>
          <input type="text" placeholder={t('AddComment')} className={s.commentInput} />
          <Button variant="ghost" className={s.publishButton}>
            {t('Publish')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedPostItem;
