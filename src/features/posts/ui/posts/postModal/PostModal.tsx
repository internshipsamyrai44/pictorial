'use client';

import s from './PostModal.module.scss';
import { PublishedPostResponse } from '@/features/posts/model/postsApi.types';
import { Button, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import { DeletePostModal } from '../../deletePostModal/DeletePostModal';
import { useState } from 'react';

type Props = {
  post: PublishedPostResponse;
  closeModal?: () => void;
};

export default function PostModal({ post, closeModal }: Props) {
  const [isOpenModalDeletePost, setIsOpenModalDeletePost] = useState(false);

  const handleDeletePost = () => {
    setIsOpenModalDeletePost(true);
  };

  return (
    <Modal className={s.postModal} onClose={closeModal}>
      <div className={s.postImg}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={post.images[0].url} alt={post.description || 'Post image'} />
      </div>
      <div className={s.postInfo}>
        {' '}
        coments <Button onClick={handleDeletePost}>Delete Post</Button>
      </div>
      <DeletePostModal
        id={post.id}
        isOpen={isOpenModalDeletePost}
        onModalClose={() => setIsOpenModalDeletePost(false)}
      />
    </Modal>

    // <div className={s.modalContainer}>
    //   <div className={s.wrap}>
    //     <div className={s.closeBtn}>
    //       <Button onClick={closeModal}>Close</Button>
    //     </div>
    //     <div className={s.container}>
    //       <div className={s.postImg}>
    //         <img src={post.images[0].url} alt={post.description || 'Post image'} />
    //       </div>
    //       <div className={s.postInfo}> coments</div>
    //     </div>
    //   </div>
    // </div>
  );
}
