'use client';

import s from './PostModal.module.scss';
import { useGetPostsByIdQuery } from '@/features/posts/api/postsApi';
import CloseButton from './closeButton/CloseButton';
import PostImage from './postImage/PostImage';
import PostContent from './postContent/PostContent';
import PostContentSkeleton from './postContentSkeleton/PostContentSkeleton';
import { useGetPublicPostsByIdQuery } from '@/features/public-posts/api/publicPostApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

type Props = {
  postID: number;
  closeModal?: () => void;
};

export default function PostModal({ postID, closeModal }: Props) {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const { data: privatePost, isLoading: isPrivateLoading } = useGetPostsByIdQuery(postID, { skip: !isAuth });
  const { data: publicPost, isLoading: isPublicLoading } = useGetPublicPostsByIdQuery(postID, { skip: isAuth });

  const post = isAuth ? privatePost : publicPost;
  const isLoading = isPrivateLoading || isPublicLoading;

  if (!post) {
    return;
  }
  console.log(isLoading);
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
              <PostContent post={post} closeModal={closeModal} isAuth={isAuth} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
