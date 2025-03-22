import { baseUrl } from '@/shared/const/baseApi';
import { PublicPostsResponse, PublishedPostResponse } from '@/features/posts/model/postsApi.types';

export type PublicPostsParamsType = { params: Promise<{ id: string; postId: string }> };

export async function generateStaticParams() {
  const res: PublicPostsResponse = await fetch(`${baseUrl}/v1/public-posts/all`).then((res) => res.json());

  return res.items.map((post: PublishedPostResponse) => ({
    postId: post.id.toString(),
    id: post.ownerId.toString()
  }));
}
