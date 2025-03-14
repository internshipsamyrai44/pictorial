'use client';

import s from './PostContent.module.scss';
import { PublishedPostResponse } from '@/features/posts/model/postsApi.types';
import PostHeader from './postHeader/PostHeader';
import AddCommentForm from './addComentForm/AddComentForm';
import InteractionBlock from './interactionBlock/InteractionBlock';
import CommentItem from '@/features/posts/ui/posts/postModal/postContent/commentItem/CommentItem';
import { DeletePostModal } from '@/features/posts/ui/deletePostModal/DeletePostModal';
import { useState } from 'react';

type Props = {
  post: PublishedPostResponse;
  closeModal?: () => void;
  editPost?: () => void;
  isAuth?: boolean;
};

export default function PostContent({ post, closeModal, isAuth, editPost }: Props) {
  const [isOpenModalDeletePost, setIsOpenModalDeletePost] = useState(false);

  const handleDeletePostClick = () => {
    setIsOpenModalDeletePost(true);
  };

  const handleCloseDeleteModal = () => {
    setIsOpenModalDeletePost(false);
    closeModal?.();
  };

  const handleEditPostClick = () => {
    editPost?.();
  };

  if (!post) {
    return;
  }

  return (
    <div className={s.wrapper}>
      <PostHeader
        avatarOwner={post.avatarOwner}
        userName={post.userName}
        onDeletePost={handleDeletePostClick}
        onEditPost={handleEditPostClick}
        isAuth={isAuth}
      />
      <div className={s.conversation}>
        <div className={s.description}>
          <CommentItem avatarSrc={post.avatarOwner} userName={post.userName} text={post.description} descriptionPost />
        </div>
        <div className={s.comments}>
          <CommentItem avatarSrc={post.avatarOwner} userName={post.userName} text={post.description} />
          <CommentItem avatarSrc={post.avatarOwner} userName={post.userName} text={post.description} />
        </div>
      </div>
      <div className={s.interactionPanel}>
        <InteractionBlock post={post} isAuth={isAuth} />
        {isAuth && <AddCommentForm />}
      </div>

      <DeletePostModal id={post.id} isOpen={isOpenModalDeletePost} onModalClose={handleCloseDeleteModal} />
    </div>
  );
}
