import s from './ZoomPhoto.module.scss';
import { ChangeEvent } from 'react';
import { useCreatePostContext } from '@/shared/hooks/useCreatePostContext';

type PropsType = {
  zoomValue: string;
  // eslint-disable-next-line no-unused-vars
  setZoomValue: (zoomValue: string) => void;
  currentPhotoId: string | undefined;
};

export const ZoomPhoto = (props: PropsType) => {
  const { userPhotos } = useCreatePostContext();
  const { zoomValue, setZoomValue, currentPhotoId } = props;
  const onChangeHanler = (e: ChangeEvent<HTMLInputElement>) => {
    setZoomValue(e.target.value);
    setZoomScale();
  };

  const setZoomScale = () => {
    userPhotos.forEach((photo) => {
      if (photo.id === currentPhotoId) {
        photo.zoom = zoomValue;
      }
    });
  };

  return (
    <div className={s.wrapper}>
      <input type="range" min="1" max="2.5" step={0.1} value={zoomValue} onChange={onChangeHanler} />
    </div>
  );
};
