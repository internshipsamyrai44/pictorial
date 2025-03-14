import PublicPostsPage from '@/features/public-posts/ui/publicPostsPage/PublicPostsPage';
export type PublicPostsParamsType = { params: Promise<{ id: string; postId: string }> };

export async function generateStaticParams() {
  const res = await fetch('https://inctagram.work/api/v1/public-posts/all').then((res) => res.json());

  return res.items.map((post: { id: string; postId: string }) => ({
    postId: post.postId.toString(),
    id: post.id.toString()
  }));
}

export default function PublicPosts() {
  return <PublicPostsPage />;
}
