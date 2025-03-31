import PublicProfile from '@/features/profile/ui/settings/public-profile/PublicProfile';
import PostModal from '@/features/posts/ui/posts/postModal/PostModal';
import { baseUrl } from '@/shared/const/baseApi';
import { PublicPostsResponse } from '@/features/posts/model/postsApi.types';
import { use } from 'react';
import { PublicPostsParamsType } from '@/app/(pages)/public-user/profile/[id]/[postId]/data';
import { notFound } from 'next/navigation';

const getUserPosts = async (id: string): Promise<PublicPostsResponse> => {
  const res = await fetch(`${baseUrl}v1/public-posts/user/${id}`);
  return res.json();
};

export default function PublicUserPost({ params }: PublicPostsParamsType) {
  const { id, postId } = use(params);

  const userPosts = use(getUserPosts(id));

  const isPostExist = userPosts.items.some((post) => post.id.toString() === postId);

  if (!isPostExist) {
    notFound();
  }

  return (
    <>
      <PublicProfile id={id} />
      <PostModal postID={Number(postId)} />
    </>
  );
}
