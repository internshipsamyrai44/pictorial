import { useEffect } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button, Input, LoaderLinear, Popover } from '@internshipsamyrai44-ui-kit/components-lib';

import RegistrationConfirmationSuccessSvg from '@/shared/assets/img/RegistrationConfirmationSuccessSvg';
import RegistrationConfirmationExpiredSvg from '@/shared/assets/img/RegistrationConfirmationExpiredSvg';
import { PATH } from '@/shared/const/PATH';
import { useConfirmRegistrationMutation } from '../api/confirmRegistrationApi';
import { yupResolver } from '@hookform/resolvers/yup';
import { registrationEmailResendSchema, FormRegistrationEmailResend } from '../model/validationScheme';
import { getBaseUrl } from '@/shared/utils';
import { useRegistrationEmailResendingMutation } from '../api/registrationEmailResendingApi';

import s from './RegistrationConfirmation.module.scss';

interface Props {
  token: string | null;
  email: string | null;
  className?: string;
}

export const RegistrationConfirmation = ({ className, token, email }: Props) => {
  const baseUrl = getBaseUrl();
  const [confirmRegistration, { isError, isSuccess }] = useConfirmRegistrationMutation();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormRegistrationEmailResend>({
    resolver: yupResolver(registrationEmailResendSchema)
  });

  const [resendConfirmation, { isLoading, isSuccess: isResendSuccess, isError: isResendError }] =
    useRegistrationEmailResendingMutation();

  // TODO message about succesfull send

  const handleSubmitForm = () => {
    if (email) {
      resendConfirmation({ email, baseUrl });
    }
  };

  useEffect(() => {
    if (token) {
      confirmRegistration({ confirmationCode: token });
    }
  }, [token]);

  if (!token || !email) {
    // TODO error page
    return null;
  }

  if (isError)
    return (
      <div className={`${s.wrapper} ${className}`}>
        <div className={s['text-wrapper']}>
          <h1 className={s.title}>Email verification link expired</h1>
          <p className={s.description}>
            Looks like the verification link has expired. Not to worry, we can send the link again
          </p>
          <form onSubmit={handleSubmit(handleSubmitForm)} className={s.form}>
            <Input
              placeholder="Enter your email"
              className={s.input}
              label="Email"
              {...register('email')}
              disabled={isLoading}
              errorMessage={errors.email?.message}
            />
            <Button className={s['button-resend']} fullWidth disabled={isLoading} type="submit">
              Resend verification link
            </Button>
          </form>
        </div>
        <RegistrationConfirmationExpiredSvg className={s.img} />
        <Popover />
      </div>
    );

  if (isSuccess)
    return (
      <div className={`${s.wrapper} ${className}`}>
        <h1 className={s.title}>Congratulations!</h1>
        <p className={s.description}>Your email has been confirmed</p>
        <Button asChild className={s['button-sign-in']}>
          <Link href={PATH.LOGIN}>Sign In</Link>
        </Button>
        <RegistrationConfirmationSuccessSvg className={s.img} />
      </div>
    );

  return <LoaderLinear />;
};
