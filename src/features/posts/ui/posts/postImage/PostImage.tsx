'use client';

import { PostImageViewModel } from '@/features/posts/model/postsApi.types';
import { Carousel } from '../../create-post/Carousel/Carousel';

type Props = {
  images: PostImageViewModel[];
};

export default function PostImage({ images }: Props) {
  return (
    <Carousel>
      {images.map((photo, index) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={photo.url} alt={'Post image'} key={`post-photo-${index}`} />
      ))}
    </Carousel>
  );
}
