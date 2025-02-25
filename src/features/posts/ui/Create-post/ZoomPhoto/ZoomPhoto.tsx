import s from './ZoomPhoto.module.scss';

export const ZoomPhoto = () => {
  return (
    <div className={s.wrapper}>
      <input type="range" min="-10" max="10" />
    </div>
  );
};
