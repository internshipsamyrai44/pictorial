import s from './Home.module.scss';
import { useTranslations } from 'next-intl';

const Home = () => {
  const t = useTranslations('HomePage');
  return (
    <div className={s.container}>
      <div className={s.home}>{t('title')}</div>
    </div>
  );
};

export default Home;
