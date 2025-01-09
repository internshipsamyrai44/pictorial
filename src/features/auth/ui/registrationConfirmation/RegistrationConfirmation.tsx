import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import Link from 'next/link';

import RegistrationConfirmationSvg from '../../../../../public/images/RegistrationConfirmationSvg';
import { PATH } from '@/shared/const/PATH';
import s from './RegistrationConfirmation.module.scss';

interface Props {
  token?: string | string[];
  className?: string;
}

export const RegistrationConfirmation = ({ className }: Props) => {
  return (
    <div className={`${s.wrapper} ${className}`}>
      <h1 className={s.title}>Congratulations!</h1>
      <p className={s.description}>Your email has been confirmed</p>
      <Button asChild className={s.button}>
        <Link href={PATH.AUTH.LOGIN}>Sign In</Link>
      </Button>
      <RegistrationConfirmationSvg className={s.img} />
    </div>
  );
};
