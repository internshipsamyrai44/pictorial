import Image from 'next/image';
import s from './Filters.module.scss';
import placeholder from '../../../../../../public/images/photo-placeholder.png';

type PropsType = {
  userPhotos: string[];
};

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

export const Filters = (props: PropsType) => {
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

  const { userPhotos } = props;
  return (
    <>
      <div className={s.wrapper}>
        <div className={s.photo}>
          <Image
            src={userPhotos[0] || placeholder}
            className={s.image}
            alt={'User Photo'}
            layout="responsive"
            width={100}
            height={100}
          />
        </div>

        <div className={s.filters}>
          {filters.map((filter) => (
            <div className={s.item} key={filter}>
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
