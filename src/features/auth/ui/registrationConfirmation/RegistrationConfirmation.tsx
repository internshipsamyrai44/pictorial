import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Alertpopup, Button, Input, LoaderLinear, Modal, Popover } from '@internshipsamyrai44-ui-kit/components-lib';

import { PATH } from '@/shared/const/PATH';

import { yupResolver } from '@hookform/resolvers/yup';

import { getBaseUrl } from '@/shared/utils';

import s from './RegistrationConfirmation.module.scss';
import { useRequestError } from '@/shared/hooks/useRequestError';
import { FormRegistrationEmailResend, registrationEmailResendSchema } from '../../model/validationScheme';
import RegistrationConfirmationExpiredSvg from '../../../../../public/images/RegistrationConfirmationExpiredSvg';
import RegistrationConfirmationSuccessSvg from '../../../../../public/images/RegistrationConfirmationSuccessSvg';
import { useConfirmRegistrationMutation, useRegistrationEmailResendingMutation } from '@/features/auth/api/authApi';
import { useTranslations } from 'next-intl';

interface Props {
  token: string | null;
  email: string | null;
  className?: string;
}

export const RegistrationConfirmation = ({ className, token, email }: Props) => {
  const baseUrl = getBaseUrl();
  const [isModalActive, setIsModalActive] = useState(false);
  const t = useTranslations('Auth');

  const [confirmRegistration, { isSuccess: isConfirmSuccess, error: isConfirmErrorMessage }] =
    useConfirmRegistrationMutation();
  const confirmErrorMessage = useRequestError(isConfirmErrorMessage);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<FormRegistrationEmailResend>({
    resolver: yupResolver(registrationEmailResendSchema),
    defaultValues: {
      email: email || ''
    }
  });

  const [
    resendConfirmation,
    { isLoading, isSuccess: isResendSuccess, isError: isResendError, error: isResendErrorMessage }
  ] = useRegistrationEmailResendingMutation();
  const resendErrorMessage = useRequestError(isResendErrorMessage);

  const handleSubmitForm = () => {
    if (email) {
      resendConfirmation({ email, baseUrl });
      setIsModalActive(true);
    }
  };

  useEffect(() => {
    if (token) {
      confirmRegistration({ confirmationCode: token });
    }
    // eslint-disable-next-line
  }, [token]);

  if (!token || !email) {
    return (
      <div className={`${s.wrapper} ${className}`}>
        <h1 className={s.title}>The parameters are incorrect. Please contact our support team</h1>
        <Button asChild className={s['button-resend']}>
          <Link href={PATH.MAIN}>Support</Link>
        </Button>
        {/* TODO link to support page */}
      </div>
    );
  }

  if (isConfirmErrorMessage)
    return (
      <>
        {(confirmErrorMessage || isResendErrorMessage) && (
          <Alertpopup alertType={'error'} message={confirmErrorMessage || resendErrorMessage || ''} />
        )}
        <div className={`${s.wrapper} ${className}`}>
          <div className={s['text-wrapper']}>
            <h1 className={s.title}>{t('LinkExpired')}</h1>
            <p className={s.description}>{t('LinkExpiredDescription')}</p>
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
                {t('ResendLink')}
              </Button>
            </form>
          </div>
          <RegistrationConfirmationExpiredSvg className={s.img} />
          <Popover />
        </div>
        {isModalActive && (isResendSuccess || isResendError) && (
          <Modal title={'Email Sent'} className={s.modal} onClose={() => setIsModalActive(false)}>
            <p>
              {t('EmailConfirmationLinkSent')}
              {getValues('email')}
            </p>
            <Button variant={'primary'} onClick={() => setIsModalActive(false)} className={s.button}>
              OK
            </Button>
          </Modal>
        )}
      </>
    );

  if (isConfirmSuccess)
    return (
      <div className={`${s.wrapper} ${className}`}>
        <h1 className={s.title}>{t('Congratulations')}</h1>
        <p className={s.description}>{t('EmailConfirmed')}</p>
        <Button asChild className={s['button-sign-in']}>
          <Link href={PATH.AUTH.LOGIN}>{t('signIn')}</Link>
        </Button>
        <RegistrationConfirmationSuccessSvg className={s.img} />
      </div>
    );

  return <LoaderLinear />;
};
