import s from './ResizePhoto.module.scss';

export const ResizePhoto = () => {
  return (
    <div className={s.wrapper}>
      <div className={s.item}>
        <span>Original</span>
      </div>
      <div className={s.item}>
        <span>1:1</span>
      </div>
      <div className={s.item}>
        <span>4:5</span>
      </div>
      <div className={s.item}>
        <span>16:9</span>
      </div>
    </div>
  );
};
