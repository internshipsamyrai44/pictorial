'use client';

import { useState } from 'react';
import { useGetPostsByUsernameQuery } from '../../api/postsApi';
import s from './ProfilePosts.module.scss';
import PostModal from './postModal/PostModal';
import PostsSkeleton from './postsSkeleton/PostsSkeleton';
import { EditPostModal } from './editPostModal/EditPostModal';

type Props = {
  userName: string;
};

export default function ProfilePosts({ userName }: Props) {
  const { data: posts, isLoading } = useGetPostsByUsernameQuery(userName);
  const [selectedPostID, setSelectedPostID] = useState<number | null>(null);
  const [isEdited, setIsEdited] = useState(false);

  const openPostModal = (postID: number) => setSelectedPostID(postID);
  const closePostModal = () => setSelectedPostID(null);

  const closeEditPostModal = () => setIsEdited(false);

  const handleEditPost = () => setIsEdited(true);

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
              onClick={() => openPostModal(post.id)}
            />
          </div>
        ))}
      </div>
      {selectedPostID &&
        posts &&
        (isEdited ? (
          <EditPostModal postID={selectedPostID} closeModal={closeEditPostModal} />
        ) : (
          <PostModal postID={selectedPostID} closeModal={closePostModal} editPost={handleEditPost} />
        ))}
    </>
  );
}
