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
  isAuth?: boolean;
};

export default function PostContent({ post, closeModal, isAuth }: Props) {
  const [isOpenModalDeletePost, setIsOpenModalDeletePost] = useState(false);

  const handleDeletePostClick = () => {
    setIsOpenModalDeletePost(true);
  };

  const handleCloseModal = () => {
    setIsOpenModalDeletePost(false);
    closeModal?.();
  };
  if (!post) {
    return;
  }

  return (
    <div className={s.wrapper}>
      <PostHeader avatarOwner={post.avatarOwner} userName={post.userName} onDeletePost={handleDeletePostClick} />
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
        <InteractionBlock post={post} />
        {isAuth && <AddCommentForm />}
      </div>

      <DeletePostModal id={post.id} isOpen={isOpenModalDeletePost} onModalClose={handleCloseModal} />
    </div>
  );
}
