'use client';

import s from './PostModal.module.scss';
import { useGetPostsByIdQuery } from '@/features/posts/api/postsApi';
import { useGetPublicPostsByIdQuery } from '@/features/public-posts/api/publicPostApi';
import PostImage from '../postImage/PostImage';
import PostContent from './postContent/PostContent';
import PostContentSkeleton from './postContentSkeleton/PostContentSkeleton';
import CloseButton from '../closeButton/CloseButton';
import { useRouter } from 'next/navigation';
import { getIsAuth } from '@/redux/authSlice';
import { useSelector } from 'react-redux';

type Props = {
  postID: number;
  userId?: number;
  editPost?: () => void;
  closePostModal?: () => void;
  isMyProfile?: boolean;
};

export default function PostModal({ postID, userId, editPost, isMyProfile = false, closePostModal }: Props) {
  const isAuth = useSelector(getIsAuth);
  const router = useRouter();

  const { data: privatePost } = useGetPostsByIdQuery(postID, {
    skip: !isMyProfile
  });

  const { data: publicPost } = useGetPublicPostsByIdQuery(postID, {
    skip: isMyProfile
  });

  const post = isMyProfile ? privatePost : publicPost;
  const isLoading = !post;

  const closeModal = () => {
    closePostModal ? closePostModal() : router.push(`/profile/${userId}`);
  };

  return (
    <div className={s.wrap}>
      <div className={s.postContainer}>
        <CloseButton onClick={closeModal} className={s.closeBtn} />
        {isLoading && <PostContentSkeleton />}
        {post && (
          <div className={s.contentContainer}>
            <div className={s.postImg}>
              <PostImage images={post.images} />
            </div>
            <div className={s.postContent}>
              <PostContent post={post} closeModal={closeModal} isAuth={isAuth} editPost={editPost} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
