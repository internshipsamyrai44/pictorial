import s from '@/widgets/general-header/GeneralHeader.module.scss';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import Link from 'next/link';

export const HeaderButton = () => (
  <div className={s.buttonContainer}>
    <Button className={s.logIn} asChild variant="ghost">
      <Link href="/auth/login">Log in</Link>
    </Button>
    <Button asChild variant="primary" className={s.signUp}>
      <Link href="/auth/signup">Sign up</Link>
    </Button>
  </div>
);
