import Image from 'next/image';
import s from './Filters.module.scss';
import placeholder from '../../../../../../public/images/photo-placeholder.png';
import { Carousel } from '@/features/posts/ui/Create-post/Carousel/Carousel';
import { useCreatePostContext } from '@/shared/hooks/useCreatePostContext';
import { useState } from 'react';

type FiltersType =
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
  const { userPhotos } = useCreatePostContext();
  const [photoFilter, setPhotoFilter] = useState<FiltersType>('normal');
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

  return (
    <>
      <div className={s.wrapper}>
        <div className={s.photo}>
          <Carousel>
            {userPhotos.map((photo: string, index: number) => (
              <Image
                src={photo || placeholder}
                className={`${s.image} ${s[photoFilter]}`}
                alt={'User Photo'}
                layout="responsive"
                width={100}
                height={100}
                key={`user-photo-${index}`}
              />
            ))}
          </Carousel>
        </div>
        <div className={s.filters}>
          {filters.map((filter) => (
            <div className={s.item} key={filter} onClick={() => setPhotoFilter(filter)}>
              <Image
                src={userPhotos[0]}
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
