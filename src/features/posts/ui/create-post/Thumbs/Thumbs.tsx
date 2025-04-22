import s from './Thumbs.module.scss';
import Image from 'next/image';
import placeholder from '../../../../../../public/images/photo-placeholder.png';
import PlusIcon from '../../../../../../public/icons/plus-circle.svg';
import SmallCrossIcon from '../../../../../../public/icons/smallCross.svg';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import { UserPhotoType } from '@/features/posts/ui/create-post/createPostContext';
import { useCreatePostContext } from '@/shared/hooks/useCreatePostContext';
import { useEffect } from 'react';

type PropsType = {
  userPhotos: UserPhotoType[];
  handleButtonClick: () => void;
  // eslint-disable-next-line no-unused-vars
};

export const Thumbs = (props: PropsType) => {
  const { setUserPhotos, paginate } = useCreatePostContext();
  const { userPhotos, handleButtonClick } = props;

  const removeUserPhotoHandler = (photoIndex: number) => {
    setUserPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== photoIndex));
  };

  useEffect(() => {
    if (userPhotos.length === 0) {
      paginate('prev');
    }
  }, [userPhotos]);

  return (
    <div className={`${s.thumblist}`}>
      <div className={s.thumbnails}>
        {userPhotos.map((photo, i) => (
          <div className={s.thumb} key={`thumb-${i}`}>
            <Image src={photo.uri || placeholder} alt={`User photo thumb ${i}`} width={100} height={100} />
            <Button
              variant={'ghost'}
              className={s.remove}
              aria-label={'Remove photo'}
              onClick={() => removeUserPhotoHandler(i)}
            >
              <SmallCrossIcon className={`${s.icon} ${s.removeIcon}`} width={8} height={8} />
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={handleButtonClick} disabled={userPhotos.length >= 10} className={s.add} aria-label={'Add photo'}>
        <PlusIcon className={`${s.icon} ${s.add}`} width={30} height={30} />
      </Button>
    </div>
  );
};
