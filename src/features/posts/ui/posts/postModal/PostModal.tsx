'use client';

import s from './PostModal.module.scss';
import { useGetPostsByIdQuery } from '@/features/posts/api/postsApi';
import { Loader } from '@/shared/ui/loader/Loader';
import CloseButton from './closeButton/CloseButton';
import { Carousel } from '../../create-post/Carousel/Carousel';

type Props = {
  postID: number;
  closeModal?: () => void;
};

export default function PostModal({ postID, closeModal }: Props) {
  const { data: post, isLoading } = useGetPostsByIdQuery(postID);
  console.log(post);
  console.log(post?.images);

  return (
    <div className={s.wrap}>
      <div className={s.modalContainer}>
        <CloseButton onClick={closeModal} />
        <div className={s.postContainer}>
          <div className={s.postImg}>
            {isLoading && <Loader />}
            {post && (
              <Carousel>
                {post.images.map((photo, index) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo.url} alt={'Post image'} key={`post-photo-${index}`} />
                ))}
              </Carousel>
            )}
            {/* {post && <img src={post?.images[0].url} alt={post?.description || 'Post image'} />} */}
          </div>
          <div className={s.postInfo}> coments</div>
        </div>
      </div>
    </div>
  );
}
