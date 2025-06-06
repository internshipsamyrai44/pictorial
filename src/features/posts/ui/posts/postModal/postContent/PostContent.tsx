'use client';

import s from './PostContent.module.scss';
import { PublishedPostResponse } from '@/features/posts/model/postsApi.types';
import PostHeader from './postHeader/PostHeader';
import AddCommentForm from './addComentForm/AddComentForm';
import InteractionBlock from './interactionBlock/InteractionBlock';
import { DeletePostModal } from '@/features/posts/ui/deletePostModal/DeletePostModal';
import { useState } from 'react';
import { useCreateCommentMutation } from '@/features/posts/api/postsApi';
import { PostConversation } from './postConversation/PostConversation';
import { useMeQuery } from '@/features/auth/api/authApi';
import { Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';

type Props = {
  post: PublishedPostResponse;
  closeModal: () => void;
  editPost?: () => void;
  isAuth?: boolean;
};

export default function PostContent({ post, closeModal, isAuth, editPost }: Props) {
  const [isOpenModalDeletePost, setIsOpenModalDeletePost] = useState(false);
  const [createComment] = useCreateCommentMutation();
  const { data } = useMeQuery(undefined, { skip: !isAuth });
  const isBlocked = isAuth ? data?.isBlocked : false;
  const t = useTranslations('Account');

  const handleDeletePostClick = () => {
    setIsOpenModalDeletePost(true);
  };

  const handleCloseDeleteModal = () => {
    setIsOpenModalDeletePost(false);
  };
  if (!post) {
    return;
  }

  const handleEditPostClick = () => {
    editPost?.();
  };

  if (!post) {
    return;
  }

  const handleAddComment = (value: string) => {
    createComment({ postId: post.id, content: value });
  };

  return (
    <div className={s.wrapper}>
      <PostHeader
        avatarOwner={post.avatarOwner}
        userName={post.userName}
        onDeletePost={handleDeletePostClick}
        onEditPost={handleEditPostClick}
        isAuth={isAuth}
        isBlocked={isBlocked}
      />
      {isBlocked ? (
        <div className={s.blockedMessage}>
          <Typography variant="regular-text-14">{t('blocked.message')}</Typography>
        </div>
      ) : (
        <PostConversation post={post} />
      )}
      <div className={s.interactionPanel}>
        {isAuth && !isBlocked && (
          <>
            <InteractionBlock post={post} isAuth={isAuth} />
            <AddCommentForm onClick={handleAddComment} />
          </>
        )}
      </div>
      <DeletePostModal
        id={post.id}
        isOpen={isOpenModalDeletePost}
        onModalClose={handleCloseDeleteModal}
        closePostModal={closeModal}
      />
    </div>
  );
}
