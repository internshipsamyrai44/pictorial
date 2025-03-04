'use client';

import { useState } from 'react';
import { useGetPostsByUsernameQuery } from '../../api/postsApi';
import s from './ProfilePosts.module.scss';
import PostModal from './postModal/PostModal';
import PostsSkeleton from './postsSkeleton/PostsSkeleton';

type Props = {
  userName: string;
};

export default function ProfilePosts({ userName }: Props) {
  const { data: posts, isLoading } = useGetPostsByUsernameQuery(userName);
  const [selectedPostID, setSelectedPostID] = useState<number | null>(null);

  const openModal = (postID: number) => setSelectedPostID(postID);
  const closeModal = () => setSelectedPostID(null);

  if (isLoading) {
    return (
      <div className={s.posts}>
        <PostsSkeleton quantity={12} />
      </div>
    );
  }

  return (
    <>
      <div className={s.posts}>
        {posts?.items.map((post) => (
          <div key={post.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={s.post}
              src={post.images[0].url}
              alt={post.description || 'Post image'}
              onClick={() => openModal(post.id)}
            />
          </div>
        ))}
      </div>
      {selectedPostID && posts && <PostModal postID={selectedPostID} closeModal={closeModal} />}
    </>
  );
}
