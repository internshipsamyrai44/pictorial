import PublicProfile from '@/features/profile/ui/settings/public-profile/PublicProfile';
import PostModal from '@/features/posts/ui/posts/postModal/PostModal';
import { use } from 'react';
import { PublicPostsParamsType } from '@/app/(pages)/public-user/profile/[id]/[postId]/data';
import { baseUrl } from '@/shared/const/baseApi';
import { notFound } from 'next/navigation';
import { PublicPostResponse } from '@/features/public-posts/model/publicPostApi.types';

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
      <PublicProfile id={id} />
      <PostModal postID={Number(postId)} />
    </>
  );
}
