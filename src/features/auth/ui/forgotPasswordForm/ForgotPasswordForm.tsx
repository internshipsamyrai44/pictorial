'use client';

import Link from 'next/link';
import { useState } from 'react';
import ReCAPTCHAComponent from 'react-google-recaptcha';
import { Alertpopup, Button, Card, Input, LoaderLinear, Modal } from '@internshipsamyrai44-ui-kit/components-lib';
import { useForm } from 'react-hook-form';
import { getEmailValidationSchema } from '@/shared/utils/EmailValidationSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSendEmailToRecoveryPasswordMutation } from '@/features/auth/api/authApi';
import * as yup from 'yup';
import { PATH } from '@/shared/const/PATH';
import { getBaseUrl } from '@/shared/utils';
import { useRequestError } from '@/shared/hooks/useRequestError';
import { useRouter } from 'next/navigation';
import s from './ForgotPasswordForm.module.scss';
import { useTranslations } from 'next-intl';

type FormInput = {
  email: string;
};

export const ForgotPasswordForm = () => {
  const { push } = useRouter();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [sendEmailToRecoveryPassword, { isSuccess: isSendEmailSuccess, isLoading, error }] =
    useSendEmailToRecoveryPasswordMutation();
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const baseUrl = getBaseUrl();
  const errorMessage = useRequestError(error);
  const t = useTranslations('Auth');

  const EmailValidationSchema = yup
    .object({
      email: getEmailValidationSchema()
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormInput>({
    // @ts-ignore
    resolver: yupResolver(EmailValidationSchema),
    mode: 'onTouched'
  });

  const onsetCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const sendLinkToEmail = (data: FormInput) => {
    const params = {
      email: data.email,
      recaptcha: captchaToken || '',
      baseUrl
    };

    sendEmailToRecoveryPassword(params);
    setEmail(data.email);
    setIsModalActive(true);
  };

  const onModalClose = () => {
    setIsModalActive(false);
    push(PATH.AUTH.LOGIN);
  };

  return (
    <>
      {isLoading && <LoaderLinear />}
      {errorMessage && <Alertpopup alertType={'error'} message={errorMessage} />}
      <Card className={s.card}>
        <form onSubmit={handleSubmit(sendLinkToEmail)} className={s.form}>
          <p className={s.header}>{t('ForgotPassword')}</p>
          <Input {...register('email')} type="text" label={'Email'} errorMessage={errors.email?.message} />
          <span className={s.description}>{t('ForgotPasswordFormDescription')}</span>
          <Button className={s.button} disabled={!captchaToken || !isValid}>
            {t('SendLink')}
          </Button>
          <Link className={s.link} href={PATH.AUTH.LOGIN}>
            {t('BackToSignIn')}
          </Link>
          {!isSendEmailSuccess ? (
            <ReCAPTCHAComponent
              sitekey={process.env.RECAPTCHA_ENTERPRISE_API_KEY || ''}
              onChange={onsetCaptchaChange}
            />
          ) : (
            <div>{t('LinkSentByEmail')}</div>
          )}
          {isModalActive && isSendEmailSuccess && (
            <Modal className={s.modal} title={'Email sent'} onClose={onModalClose}>
              <div className={s.modalText}>
                {t('EmailConfirmationLinkSent')}
                {email}
              </div>
              <div className={s.modalButton}>
                <Button onClick={onModalClose}>OK</Button>
              </div>
            </Modal>
          )}
        </form>
      </Card>
    </>
  );
};
