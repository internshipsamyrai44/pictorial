import { use } from 'react';

import { baseUrl } from '@/shared/const/baseApi';
import { notFound } from 'next/navigation';
import { PublicPostResponse } from '@/features/public-posts/model/publicPostApi.types';
import { PublicPostsParamsType } from './data';
import PostModal from '@/features/posts/ui/posts/postModal/PostModal';
import Profile from '@/features/profile/ui/Profile';

const getUserPostByPostID = async (postID: string): Promise<PublicPostResponse> => {
  const res = await fetch(`${baseUrl}v1/public-posts/${postID}`);
  return res.json();
};

export default function PublicUserPost({ params }: PublicPostsParamsType) {
  const { id, postId } = use(params);

  const userPost = use(getUserPostByPostID(postId));

  const isPostBelongToUser = userPost.ownerId === Number(id);

  if (!isPostBelongToUser) {
    notFound();
  }

  return (
    <>
      <Profile id={id} />
      <PostModal postID={Number(postId)} userId={Number(id)} />
    </>
  );
}
