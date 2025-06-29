'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useGetPostsByUsernameQuery } from '../../api/postsApi';
import s from './ProfilePosts.module.scss';
import PostModal from './postModal/PostModal';
import PostsSkeleton from './postsSkeleton/PostsSkeleton';
import { EditPostModal } from './editPostModal/EditPostModal';

type Props = {
  userName: string;
  isMyProfile: boolean;
};

export default function ProfillePosts({ userName, isMyProfile }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { data, isLoading } = useGetPostsByUsernameQuery(userName, {
    skip: !isClient
  });
  const posts = data?.items ?? [];

  const [selectedPostID, setSelectedPostID] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const openPostModal = (postID: number) => {
    setSelectedPostID(postID);
    setIsEditing(false);
  };

  const closePostModal = () => {
    setSelectedPostID(null);
    setIsEditing(false);
  };

  const handleEditPost = () => setIsEditing(true);

  if (!isClient || isLoading) {
    return (
      <div className={s.posts}>
        <PostsSkeleton quantity={12} />
      </div>
    );
  }

  return (
    <>
      <div className={s.posts}>
        {posts.map((post) => {
          const imageUrl = post.images[0]?.url;

          if (!imageUrl) return null;

          return (
            <div key={post.id}>
              <Image
                className={s.post}
                src={imageUrl}
                alt={post.description || 'Post image'}
                width={235}
                height={230}
                style={{ objectFit: 'cover' }}
                onClick={() => openPostModal(post.id)}
              />
            </div>
          );
        })}
      </div>

      {selectedPostID !== null &&
        (isEditing ? (
          <EditPostModal postID={selectedPostID} closeModal={closePostModal} />
        ) : (
          <PostModal
            postID={selectedPostID}
            editPost={handleEditPost}
            isMyProfile={isMyProfile}
            closePostModal={closePostModal}
          />
        ))}
    </>
  );
}
