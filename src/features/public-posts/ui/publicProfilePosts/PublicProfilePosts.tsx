'use client';

import s from './PublicProfilePosts.module.scss';
import { Alertpopup } from '@internshipsamyrai44-ui-kit/components-lib';
import Image from 'next/image';
import { useState } from 'react';
import { useGetPublicUserPostsQuery } from '@/features/public-posts/api/publicPostApi';
import PostsSkeleton from '@/features/posts/ui/posts/postsSkeleton/PostsSkeleton';
import PostModal from '@/features/posts/ui/posts/postModal/PostModal';

type Props = {
  id: number;
};

export const PublicProfilePosts = ({ id }: Props) => {
  const { data, error, isFetching } = useGetPublicUserPostsQuery({ userId: id });
  const posts = data?.items ?? [];

  const [selectedPostID, setSelectedPostID] = useState<number | null>(null);

  const openPostModal = (postID: number) => setSelectedPostID(postID);
  const closePostModal = () => setSelectedPostID(null);

  if (error) {
    return <Alertpopup alertType="error" message="Error fetching posts" />;
  }

  if (isFetching) {
    return (
      <div className={s.posts}>
        <PostsSkeleton quantity={12} />
      </div>
    );
  }

  const validPosts = posts.filter((post) => post.images?.[0]?.url);

  return (
    <>
      <div className={s.images}>
        {validPosts.length > 0 ? (
          validPosts.map((post) => {
            const imageUrl = post.images[0].url;

            return (
              <div key={post.id} onClick={() => openPostModal(post.id)} className={s.postList}>
                <Image
                  className={s.image}
                  src={imageUrl}
                  alt="Profile image"
                  width={230}
                  height={235}
                  style={{ objectFit: 'cover', borderRadius: '4px', cursor: 'pointer' }}
                />
              </div>
            );
          })
        ) : (
          <p>No posts available</p>
        )}
      </div>

      {selectedPostID !== null && <PostModal postID={selectedPostID} closeModal={closePostModal} />}
    </>
  );
};
