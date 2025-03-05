'use client';

import s from './PublicProfilePosts.module.scss';
import { Alertpopup, LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';
import Image from 'next/image';
import { useGetPublicUserPostsQuery } from '@/features/public-posts/api/publicPostApi';

type Props = {
  id: number;
};

export const PublicProfilePosts = ({ id }: Props) => {
  // Получаем посты для пользователя с id, переданным через пропсы
  const { data: posts, error, isFetching } = useGetPublicUserPostsQuery({ userId: id });

  if (isFetching) return <LoaderLinear />;
  if (error) return <Alertpopup alertType="error" message="Error fetching posts" />;

  // Фильтруем посты, оставляя только те, где есть URL изображения
  const validPosts = posts?.items.filter((post) => post.images?.[0]?.url);

  return (
    <div className={s.images}>
      {validPosts && validPosts.length > 0 ? (
        validPosts.map((post) => (
          <Image
            key={post.id}
            className={s.image}
            loader={() => post.images[0].url}
            src={post.images[0].url}
            alt="Profile image"
            unoptimized={true}
            height={0}
            width={0}
          />
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};
