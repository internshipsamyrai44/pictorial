import s from './ZoomPhoto.module.scss';
import { ChangeEvent } from 'react';
import { useCreatePostContext } from '@/shared/hooks/useCreatePostContext';

type PropsType = {
  zoomValue: string;
  // eslint-disable-next-line no-unused-vars
  setZoomValue: (zoomValue: string) => void;
};

export const ZoomPhoto = (props: PropsType) => {
  const { userPhotos, currentPhotoId } = useCreatePostContext();
  const { zoomValue, setZoomValue } = props;
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setZoomValue(e.target.value);

    setZoomScale(e.target.value);
  };

  const setZoomScale = (zoomValue: string) => {
    userPhotos.map((photo) => {
      if (photo.id === currentPhotoId) {
        photo.zoom = zoomValue;
      }
    });
  };

  return (
    <div className={s.wrapper}>
      <input type="range" min="1" max="2.5" step={0.01} value={zoomValue} onChange={onChangeHandler} />
    </div>
  );
};
