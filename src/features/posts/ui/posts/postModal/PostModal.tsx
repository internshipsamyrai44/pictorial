'use client';

import s from './PostModal.module.scss';
import { useGetPostsByIdQuery } from '@/features/posts/api/postsApi';
import { Loader } from '@/shared/ui/loader/Loader';
import PostImage from '../postImage/PostImage';
import PostContent from './postContent/PostContent';
import PostContentSkeleton from './postContentSkeleton/PostContentSkeleton';
import CloseButton from '../closeButton/CloseButton';

type Props = {
  postID: number;
  closeModal?: () => void;
  editPost?: () => void;
};

export default function PostModal({ postID, closeModal, editPost }: Props) {
  const { data: post, isLoading } = useGetPostsByIdQuery(postID);

  return (
    <div className={s.wrap}>
      <div className={s.postContainer}>
        <CloseButton onClick={closeModal} className={s.closeBtn} />
        <div className={s.contentContainer}>
          <div className={s.postImg}>
            {isLoading && <Loader />}
            {post && <PostImage images={post.images} />}
          </div>
          <div className={s.postContent}>
            {isLoading && <PostContentSkeleton />}
            {post && <PostContent post={post} editPost={editPost} closeModal={closeModal} />}
          </div>
        </div>
      </div>
    </div>
  );
}
