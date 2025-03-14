'use client';

import s from './PostModal.module.scss';
import { useGetPostsByIdQuery } from '@/features/posts/api/postsApi';
import PostImage from '../postImage/PostImage';
import PostContent from './postContent/PostContent';
import PostContentSkeleton from './postContentSkeleton/PostContentSkeleton';
import CloseButton from '../closeButton/CloseButton';
import { useGetPublicPostsByIdQuery } from '@/features/public-posts/api/publicPostApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store/store';

type Props = {
  postID: number;
  closeModal?: () => void;
  editPost?: () => void;
};

export default function PostModal({ postID, closeModal, editPost }: Props) {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const { data: privatePost } = useGetPostsByIdQuery(postID, { skip: !isAuth });
  const { data: publicPost } = useGetPublicPostsByIdQuery(postID, { skip: isAuth });

  const post = isAuth ? privatePost : publicPost;

  const isLoading = !post;

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
