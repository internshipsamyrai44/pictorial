import s from '@/widgets/general-header/GeneralHeader.module.scss';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export const HeaderButton = () => {
  const t = useTranslations('Auth');

  return (
    <div className={s.buttonContainer}>
      <Button className={s.logIn} asChild variant="ghost">
        <Link href="/auth/login">{t('LogIn')}</Link>
      </Button>
      <Button asChild variant="primary" className={s.signUp}>
        <Link href="/auth/signup">{t('signUp')}</Link>
      </Button>
    </div>
  );
};
