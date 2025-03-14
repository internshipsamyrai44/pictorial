'use client';

import s from './PostContent.module.scss';
import { PublishedPostResponse } from '@/features/posts/model/postsApi.types';
import PostHeader from './postHeader/PostHeader';
import AddComentForm from './addComentForm/AddComentForm';
import InteractionBlock from './interactionBlock/InteractionBlock';
import ComentItem from './comentItem/ComentItem';
import { DeletePostModal } from '@/features/posts/ui/deletePostModal/DeletePostModal';
import { useState } from 'react';

type Props = {
  post: PublishedPostResponse;
  closeModal?: () => void;
  editPost?: () => void;
};

export default function PostContent({ post, closeModal, editPost }: Props) {
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

  return (
    <div className={s.wrapper}>
      <PostHeader
        avatarOwner={post.avatarOwner}
        userName={post.userName}
        onDeletePost={handleDeletePostClick}
        onEditPost={handleEditPostClick}
      />
      <div className={s.сonversation}>
        <div className={s.description}>
          <ComentItem avatarSrc={post.avatarOwner} userName={post.userName} text={post.description} descriptionPost />
        </div>
        <div className={s.coments}>
          <ComentItem avatarSrc={post.avatarOwner} userName={post.userName} text={post.description} />
          <ComentItem avatarSrc={post.avatarOwner} userName={post.userName} text={post.description} />
        </div>
      </div>
      <div className={s.interactionPanel}>
        <InteractionBlock post={post} />
        <AddComentForm />
      </div>

      <DeletePostModal id={post.id} isOpen={isOpenModalDeletePost} onModalClose={handleCloseDeleteModal} />
    </div>
  );
}
