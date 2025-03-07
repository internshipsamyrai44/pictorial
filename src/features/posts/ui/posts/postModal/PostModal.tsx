'use client';

import s from './PostModal.module.scss';
import { useGetPostsByIdQuery } from '@/features/posts/api/postsApi';
import CloseButton from './closeButton/CloseButton';
import PostImage from './postImage/PostImage';
import PostContent from './postContent/PostContent';
import PostContentSkeleton from './postContentSkeleton/PostContentSkeleton';

type Props = {
  postID: number;
  closeModal?: () => void;
};

export default function PostModal({ postID, closeModal }: Props) {
  const { data: post, isLoading } = useGetPostsByIdQuery(postID);

  console.log(post);

  return (
    <div className={s.wrap}>
      <div className={s.modalContainer}>
        <CloseButton onClick={closeModal} />
        {isLoading && <PostContentSkeleton />}
        {post && (
          <div className={s.postContainer}>
            <div className={s.postImg}>
              <PostImage images={post.images} />
            </div>
            <div className={s.postContent}>
              <PostContent post={post} closeModal={closeModal} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
