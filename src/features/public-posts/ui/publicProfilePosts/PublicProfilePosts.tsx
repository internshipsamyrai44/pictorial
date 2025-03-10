'use client';

import s from './PublicProfilePosts.module.scss';
import { Alertpopup } from '@internshipsamyrai44-ui-kit/components-lib';
import Image from 'next/image';
import { useGetPublicUserPostsQuery } from '@/features/public-posts/api/publicPostApi';
import PostsSkeleton from '@/features/posts/ui/posts/postsSkeleton/PostsSkeleton';
import { useState } from 'react';
import PostModal from '@/features/posts/ui/posts/postModal/PostModal';

type Props = {
  id: number;
};

export const PublicProfilePosts = ({ id }: Props) => {
  // Получаем посты для пользователя с id, переданным через пропсы
  const { data: posts, error, isFetching } = useGetPublicUserPostsQuery({ userId: id });
  const [selectedPostID, setSelectedPostID] = useState<number | null>(null);
  const openModal = (postID: number) => setSelectedPostID(postID);
  const closeModal = () => setSelectedPostID(null);

  if (error) return <Alertpopup alertType="error" message="Error fetching posts" />;

  if (isFetching) {
    return (
      <div className={s.posts}>
        <PostsSkeleton quantity={12} />
      </div>
    );
  }

  // Фильтруем посты, оставляя только те, где есть URL изображения
  const validPosts = posts?.items.filter((post) => post.images?.[0]?.url);

  return (
    <div className={s.images}>
      {validPosts && validPosts.length > 0 ? (
        validPosts.map((post) => (
          <Image
            key={post.id}
            className={s.image}
            loader={() => post.images[0].url}
            src={post.images[0].url}
            alt="Profile image"
            unoptimized={true}
            height={0}
            width={0}
            onClick={() => openModal(post.id)}
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
      {selectedPostID && posts && <PostModal postID={selectedPostID} closeModal={closeModal} />}
    </div>
  );
};
