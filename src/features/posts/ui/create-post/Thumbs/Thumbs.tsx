import s from './Thumbs.module.scss';
import Image from 'next/image';
import placeholder from '../../../../../../public/images/photo-placeholder.png';
import PlusIcon from '../../../../../../public/icons/plus-circle.svg';
import SmallCrossIcon from '../../../../../../public/icons/smallCross.svg';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';

type PropsType = {
  userPhotos: string[];
  handleButtonClick: () => void;
  // eslint-disable-next-line no-unused-vars
  removeUserPhotoHandler: (index: number) => void;
};

export const Thumbs = (props: PropsType) => {
  const { userPhotos, handleButtonClick, removeUserPhotoHandler } = props;
  return (
    <div className={`${s.thumblist}`}>
      <div className={s.thumbnails}>
        {userPhotos.map((photo, i) => (
          <div className={s.thumb} key={`thumb-${i}`}>
            <Image src={photo || placeholder} alt={`User photo thumb ${i}`} width={100} height={100} />
            <Button
              variant={'ghost'}
              className={s.remove}
              aria-label={'Remove photo'}
              onClick={() => removeUserPhotoHandler(i)}
            >
              <SmallCrossIcon clasName={`${s.icon} ${s.removeIcon}`} width={8} height={8} />
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={handleButtonClick} disabled={userPhotos.length >= 10} className={s.add}>
        <PlusIcon clasName={`${s.icon} ${s.add}`} width={30} height={30} />
      </Button>
    </div>
  );
};
