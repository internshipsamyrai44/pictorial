import { useGetPostsByIdQuery } from '@/features/posts/api/postsApi';
import { EditPostContent } from './editPostContent/EditPostContent';
import s from './EditPostModal.module.scss';
import PostImage from '../postImage/PostImage';
import CloseButton from '../closeButton/CloseButton';
import { MouseEvent, useState } from 'react';
import { ClosePostModal } from './closePostModal/ClosePostModal';
import { useTranslations } from 'next-intl';

type Props = {
  postID: number;
  closeModal?: () => void;
};

export const EditPostModal = ({ postID, closeModal }: Props) => {
  const t = useTranslations('Post');
  const { data: post } = useGetPostsByIdQuery(postID);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);

  const handleCloseCloseModal = () => {
    setIsCloseModalOpen(false);
  };

  const handleOpenCloseModal = () => {
    setIsCloseModalOpen(true);
  };

  const handleClickOutside = (event: MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      handleOpenCloseModal();
    }
  };

  return (
    <div className={s.wrapper} onClick={handleClickOutside}>
      <div className={s.postContainer}>
        <div className={s.header}>
          {t('Edit.EditPost')}
          <CloseButton onClick={handleOpenCloseModal} className={s.closeBtn} />
        </div>
        <div className={s.contentContainer}>
          <div className={s.postImg}>{post && <PostImage images={post.images} />}</div>
          <div className={s.postContent}>{post && <EditPostContent post={post} closeModal={closeModal} />}</div>
        </div>
      </div>
      <ClosePostModal isOpen={isCloseModalOpen} closeModal={handleCloseCloseModal} onConfirm={closeModal} />
    </div>
  );
};
