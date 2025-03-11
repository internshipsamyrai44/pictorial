'use client';

import { useState, use } from 'react';

import PublicProfile from '@/features/profile/ui/settings/public-profile/PublicProfile';
import PostModal from '@/features/posts/ui/posts/postModal/PostModal';
import { useRouter } from 'next/navigation';
import { PublicPostsParamsType } from '@/app/(pages)/public-page/page';

export default function PublicUserPost({ params }: PublicPostsParamsType) {
  const [showModal, setShowModal] = useState(true);
  const { id, postId } = use(params);
  const router = useRouter();

  const handleCloseModal = () => {
    setShowModal(false);
    router.push(`/public-user/profile/${id}`);
  };

  return (
    <>
      <PublicProfile />
      {showModal && <PostModal postID={Number(postId)} closeModal={handleCloseModal} />}
    </>
  );
}
