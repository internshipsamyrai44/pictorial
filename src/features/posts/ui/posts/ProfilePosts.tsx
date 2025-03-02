'use client';

import { useState } from 'react';
import { useGetPostsByUsernameQuery } from '../../api/postsApi';
import s from './ProfilePosts.module.scss';
import PostModal from './postModal/PostModal';
import { PublishedPostResponse } from '../../model/postsApi.types';

type Props = {
  userName: string;
};

export default function ProfilePosts({ userName }: Props) {
  const posts = useGetPostsByUsernameQuery(userName);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const openModal = (post: PublishedPostResponse) => setSelectedPost(post);
  const closeModal = () => setSelectedPost(null);

  return (
    <>
      <div className={s.posts}>
        {posts.data?.items.map((post) => (
          <div key={post.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={s.post}
              src={post.images[0].url}
              alt={post.description || 'Post image'}
              onClick={() => openModal(post)}
            />
          </div>
        ))}
      </div>
      {selectedPost && posts.data && <PostModal post={selectedPost} closeModal={closeModal} />}
    </>
  );
}
