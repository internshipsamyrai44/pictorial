'use client';

import Link from 'next/link';
import { useState } from 'react';
import ReCAPTCHAComponent from 'react-google-recaptcha';
import { Button, Card, Input } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './ForgotPasswordForm.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getEmailValidationSchema } from '@/shared/utils/EmailValidationSchema';
import { baseUrl } from '@/shared/api/baseApi';
import { useSendEmailToRecoveryPasswordMutation } from '@/features/auth/api/authApi';
import * as yup from 'yup';
import Modal from '@/widgets/modal/Modal';

type FormInput = {
  email: string;
};

export const ForgotPasswordForm = () => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [sendEmailToRecoveryPassword, { isSuccess: isSendEmailSuccess }] = useSendEmailToRecoveryPasswordMutation();
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);

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
    const body = {
      email: data.email,
      recaptcha: captchaToken || '',
      baseUrl
    };

    sendEmailToRecoveryPassword(body);
    setEmail(data.email);
    setIsModalActive(true);
  };

  const onModalClose = () => {
    setIsModalActive(false);
  };

  console.log(isSendEmailSuccess);

  /* document.cookie =
    'aviabeton=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjE5NzIsImlhdCI6MTczMzk5MTA4NSwiZXhwIjoxNzMzOTk0Njg1fQ.f0bUcHR7F8nNWw8HBtju45sgn2Z5zgJcCZvMru7YYnk';
*/
  return (
    <>
      <Card className={s.card}>
        <form onSubmit={handleSubmit(sendLinkToEmail)} className={s.form}>
          <p className={s.header}>Forgot Password</p>
          <Input {...register('email')} type="text" label={'Email'} errorMessage={errors.email?.message} />
          <span className={s.description}>Enter your email address and we will send you further instructions </span>
          <Button className={s.button} disabled={!captchaToken || !isValid}>
            Send Link
          </Button>
          <Link className={s.link} href={'/login'}>
            Back to Sign In
          </Link>
          {!isSendEmailSuccess ? (
            <ReCAPTCHAComponent
              sitekey={process.env.RECAPTCHA_ENTERPRISE_API_KEY || ''}
              onChange={onsetCaptchaChange}
            />
          ) : (
            <div>The link has been sent by email. If you don’t receive an email send link again</div>
          )}
          {isModalActive && ( // TODO if send email is success
            <Modal className={s.modal} title={'Email sent'} onClose={onModalClose}>
              <div className={s.modalText}>We have sent a link to confirm your email to {email}</div>
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
