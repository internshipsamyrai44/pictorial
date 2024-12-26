import React, { useState } from 'react';
import { Alertpopup, Button, Card, Input, LoaderLinear, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import Link from 'next/link';
import { PATH } from '@/shared/const/PATH';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoginMutation } from '@/features/auth/api/authApi';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getEmailValidationSchema, getPasswordValidationSchema } from '@/shared/utils';
import { OAuthBlock } from '@/widgets/oAuth-block/oAuthBlock';
import { router } from 'next/client';
import s from './LoginForm.module.scss';
import { useRequestError } from '@/shared/hooks/useRequestError';

const formValidationSchema = yup.object().shape({
  email: getEmailValidationSchema(),
  password: getPasswordValidationSchema()
});

type FormValidationSchema = yup.InferType<typeof formValidationSchema>;

export const SigninForm = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<FormValidationSchema>({ resolver: yupResolver(formValidationSchema), mode: 'onTouched' });

  const [login, { isError, isLoading, error }] = useLoginMutation();
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const errorMessage = useRequestError(error);

  const onSubmit: SubmitHandler<FormValidationSchema> = async ({ email, password }) => {
    if (email && password) {
      try {
        const result = await login({ email, password }).unwrap();
        // Успешный вход
        setToast({ type: 'success', message: `Login successful: ${result}` });
        router.replace(PATH.PROFILE);
      } catch (err) {
        setToast({ type: 'error', message: errorMessage || 'An unexpected error occurred' });
      }
    } else {
      console.error('Email and password must be provided');
      setToast({ type: 'error', message: 'Email and password must be provided' });
    }
  };

  if (isLoading) return <LoaderLinear />;

  return (
    <Card className={s.card}>
      <Typography as={'h1'} variant={'h1'}>
        Sign In
      </Typography>
      <OAuthBlock />
      {toast && <Alertpopup alertType={toast.type} message={toast.message} />}
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Input
          type="email"
          label="Email"
          placeholder="Email"
          {...register('email')}
          onBlur={async () => {
            await trigger('email');
          }}
          errorMessage={errors.email?.message}
        />
        <Input
          type="password"
          label="Password"
          placeholder="********"
          {...register('password')}
          onBlur={async () => {
            await trigger('password');
          }}
          errorMessage={(isError || errors.password) && 'The email or password are incorrect. Try again please'}
        />
        <div className={s['forgot-password-wrapper']}>
          <Link href={PATH.FORGOT_PASSWORD}>
            <Typography className={s['forgot-password']}>Forgot Password</Typography>
          </Link>
        </div>
        <Button variant={'primary'} fullWidth type="submit">
          Sign In
        </Button>
      </form>
      <Typography variant={'regular-text-16'} className={s['account-text']}>
        Don’t have an account?
      </Typography>
      <Button asChild variant={'ghost'}>
        <Link href={PATH.SIGNUP}>Sign Up</Link>
      </Button>
    </Card>
  );
};
