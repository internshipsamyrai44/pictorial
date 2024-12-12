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

type FormInput = {
  email: string;
};

export const ForgotPasswordForm = () => {
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [sendEmailToRecoveryPassword] = useSendEmailToRecoveryPasswordMutation();
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
    mode: 'onBlur'
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
  };

  return (
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
        <ReCAPTCHAComponent sitekey={process.env.RECAPTCHA_ENTERPRISE_API_KEY || ''} onChange={onsetCaptchaChange} />
      </form>
    </Card>
  );
};
