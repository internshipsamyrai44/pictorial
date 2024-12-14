import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './RegistrationConfirmation.module.scss';
import RegistrationConfirmationSvg from '@/shared/assets/img/RegistrationConfirmationSvg';

interface Props {
  token?: string | string[];
  className?: string;
}

export const RegistrationConfirmation = ({ className }: Props) => {
  return (
    <div className={`${s.wrapper} ${className}`}>
      <h1 className={s.title}>Congratulations!</h1>
      <p className={s.description}>Your email has been confirmed</p>
      <Button className={s.button}>Sign In</Button>
      <RegistrationConfirmationSvg className={s.img} />
    </div>
  );
};
