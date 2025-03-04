'use client';

import { Carousel } from '../../../create-post/Carousel/Carousel';
import { PostImageViewModel } from '@/features/posts/model/postsApi.types';

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
