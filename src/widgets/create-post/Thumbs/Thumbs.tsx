import s from './Thumbs.module.scss';
import Image from 'next/image';
import placeholder from '../../../../public/images/photo-placeholder.png';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';

type PropsType = {
  userPhotos: string[];
  handleButtonClick: () => void;
};

export const Thumbs = (props: PropsType) => {
  const { userPhotos, handleButtonClick } = props;
  return (
    <div className={`${s.thumblist}`}>
      <div className={s.thumbnails}>
        {userPhotos.map((photo, i) => (
          <Image key={`photo-${i}`} src={photo || placeholder} alt={`User Photo ${i}`} width={100} height={100} />
        ))}
      </div>
      <Button
        variant={'ghost'}
        onClick={handleButtonClick}
        disabled={userPhotos.length >= 10}
        className={s.add}
      ></Button>
    </div>
  );
};
