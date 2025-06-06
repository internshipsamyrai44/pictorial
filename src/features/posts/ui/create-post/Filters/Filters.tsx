import Image from 'next/image';
import s from './Filters.module.scss';
import placeholder from '../../../../../../public/images/photo-placeholder.png';
import { Carousel } from '@/features/posts/ui/create-post/Carousel/Carousel';
import { useCreatePostContext } from '@/shared/hooks/useCreatePostContext';
import { useEffect, useState } from 'react';

export type FiltersType =
  | 'normal'
  | 'clarendon'
  | 'lark'
  | 'gingham'
  | 'moon'
  | 'inkwell'
  | 'nashville'
  | 'toaster'
  | 'brooklyn';

export const Filters = () => {
  const { userPhotos, setCurrentPhotoId, currentPhotoId } = useCreatePostContext();
  const [photoFilter, setPhotoFilter] = useState<FiltersType>('normal');
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);
  const filters: FiltersType[] = [
    'normal',
    'clarendon',
    'lark',
    'gingham',
    'moon',
    'inkwell',
    'nashville',
    'toaster',
    'brooklyn'
  ];
  const capitalizeFirstLetter = (str: string) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const setPhotoFilterHandler = (filter: FiltersType) => {
    userPhotos.forEach((photo) => {
      if (photo.id === currentPhotoId) {
        photo.filter = filter;
      }
    });
  };

  useEffect(() => {
    if (userPhotos.length > 0) {
      setCurrentPhotoId(userPhotos[activeSlideIndex].id);
    }
  }, [activeSlideIndex, userPhotos]);

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.photo}>
          <Carousel onSlideChange={setActiveSlideIndex}>
            {userPhotos.map((photo) => {
              if (photo.id === currentPhotoId) {
                return (
                  <Image
                    src={photo.uri || placeholder}
                    className={`${s.image} ${s[photo.filter]} ${s[photoFilter]} ${s[photo.aspectRatio]}`}
                    alt={'User Photo'}
                    layout="responsive"
                    width={100}
                    height={100}
                    style={{
                      transform: `scale(${photo.zoom})`,
                      transformOrigin: 'center center',
                      transition: 'transform 0.2s ease-in-out'
                    }}
                    key={`user-photo-${photo.id}`}
                  />
                );
              }
            })}
          </Carousel>
        </div>
        <div className={s.filters}>
          {filters.map((filter) => (
            <div
              className={`${s.item}  ${filter === userPhotos[activeSlideIndex].filter ? s.active : ''}`}
              key={filter}
              onClick={() => {
                setPhotoFilter(filter);
                setPhotoFilterHandler(filter);
              }}
            >
              <Image
                src={userPhotos[activeSlideIndex].uri}
                className={`${s.img} ${s[filter]}`}
                alt={`User Photo ${filter}`}
                width={108}
                height={108}
              />
              <span className={s.label}>{capitalizeFirstLetter(filter)}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
