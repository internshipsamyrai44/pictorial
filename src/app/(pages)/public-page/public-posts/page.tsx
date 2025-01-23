'use client';

import { useGetPublicUserPostQuery } from '@/features/public-posts/api/publicPostApi';

export default function PublicPosts() {
  const { data, isLoading, isError } = useGetPublicUserPostQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data) {
    return null;
  }

  console.log(data);

  return (
    <div>
      <section> Registered users {data.totalUsers}</section>
      <section>
        <ul className={'flex gap-4 flex-wrap'}>
          {data.items.map((item) => {
            return (
              <li key={item.id} className={'w-1/5'}>
                <div>
                  <img className={'object-cover size-60'} src={item.images[0]?.url} alt={item.description} />
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
