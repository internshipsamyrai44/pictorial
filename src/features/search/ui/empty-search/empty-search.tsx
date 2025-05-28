import s from './empty-search.module.scss';

export const EmptySearch = () => {
  return (
    <div className={s.container}>
      <p className={s.title}>Oops! This place looks empty!</p>
      <p>No recent requests</p>
    </div>
  );
};
