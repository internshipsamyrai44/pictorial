import React from 'react';
import { Button, Card, Input, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import GoogleIconSvg from '@/shared/assets/icons/GoogleIconSvg';
import GithubIconSvg from '@/shared/assets/icons/GithubIconSvg';
import Link from 'next/link';
import { PATH } from '@/shared/const/PATH';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoginMutation } from '@/features/auth/api/authApi';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getEmailValidationSchema, getPasswordValidationSchema } from '@/shared/utils';
import { OAuthBlock } from '@/widgets/oAuth-block/oAuthBlock';
import s from './LoginForm.module.scss';

const formValidationSchema = yup.object().shape({
  email: getEmailValidationSchema(),
  password: getPasswordValidationSchema()
});

type FormValidationSchema = yup.InferType<typeof formValidationSchema>;

type LoginForm = FormValidationSchema;

export const SigninForm = () => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors }
  } = useForm<LoginForm>({ resolver: yupResolver(formValidationSchema), mode: 'onTouched' });

  const [login, { isError }] = useLoginMutation();

  const onSubmit: SubmitHandler<LoginForm> = async ({ email, password }) => {
    if (email && password) {
      const result = await login({ email, password });
      if (result.error) {
        console.error('Login failed:', result.error);
      }
    } else {
      console.error('Email and password must be provided');
    }
  };

  return (
    <Card className={s.card}>
      <Typography as={'h1'} variant={'h1'}>
        Sign In
      </Typography>
      <OAuthBlock />
      <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
        <Input
          type="email"
          label="Email"
          placeholder="Email"
          {...register('email')}
          onBlur={async () => {
            await trigger('email');
          }}
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
