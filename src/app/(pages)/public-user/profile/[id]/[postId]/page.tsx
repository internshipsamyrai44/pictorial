import { use } from 'react';

import PublicProfile from '@/features/profile/ui/settings/public-profile/PublicProfile';
import PostModal from '@/features/posts/ui/posts/postModal/PostModal';
import { PublicPostsParamsType } from '@/app/(pages)/public-user/profile/[id]/[postId]/data';

export default function PublicUserPost({ params }: PublicPostsParamsType) {
  const { id, postId } = use(params);

  return (
    <>
      <PublicProfile id={id} />
      <PostModal postID={Number(postId)} />
    </>
  );
}
