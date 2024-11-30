import Header from '@/widgets/header/Header';
import s from './termsOfService.module.scss';

export default function TermsOfService() {
  return (
    <>
      <Header />
      <div className={s.container}>
        <button>Back to Sign in</button>
        <Terms title={'Terms Of Service'} />
      </div>
    </>
  );
}
