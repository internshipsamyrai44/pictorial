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

type Props = {
  post: PublishedPostResponse;
  closeModal: () => void;
  editPost?: () => void;
  isAuth?: boolean;
};

export default function PostContent({ post, closeModal, isAuth, editPost }: Props) {
  const [isOpenModalDeletePost, setIsOpenModalDeletePost] = useState(false);
  const [createComment] = useCreateCommentMutation();

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
      />
      <PostConversation post={post} />
      <div className={s.interactionPanel}>
        <InteractionBlock post={post} isAuth={isAuth} />
        {isAuth && <AddCommentForm onClick={handleAddComment} />}
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
