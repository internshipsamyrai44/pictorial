import s from './ZoomPhoto.module.scss';
import { ChangeEvent } from 'react';

type PropsType = {
  zoomValue: string;
  // eslint-disable-next-line no-unused-vars
  setZoomValue: (zoomValue: string) => void;
};

export const ZoomPhoto = (props: PropsType) => {
  const { zoomValue, setZoomValue } = props;
  const onChangeHanler = (e: ChangeEvent<HTMLInputElement>) => {
    setZoomValue(e.target.value);
  };

  return (
    <div className={s.wrapper}>
      <input type="range" min="1" max="2.5" step={0.1} value={zoomValue} onChange={onChangeHanler} />
    </div>
  );
};
