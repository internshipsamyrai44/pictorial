import Image from 'next/image';
import s from './Filters.module.scss';
import placeholder from '../../../../public/images/photo-placeholder.png';

type PropsType = {
  userPhotos: string[];
};

export const Filters = (props: PropsType) => {
  const { userPhotos } = props;
  return (
    <>
      <div className={s.wrapper}>
        <Image
          src={userPhotos[0] || placeholder}
          className={s.image}
          alt={'User Photo'}
          layout="responsive"
          width={100}
          height={100}
        />
        <div className={s.filters}></div>
      </div>
    </>
  );
};
