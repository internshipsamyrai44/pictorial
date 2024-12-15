import GoogleIconSvg from '@/shared/assets/icons/GoogleIconSvg';
import GithubIconSvg from '@/shared/assets/icons/GithubIconSvg';

import { Button, Card, Checkbox, Input } from '@internshipsamyrai44-ui-kit/components-lib';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { FormSignUp, signUpSchema, useSignUpMutation } from '@/features/signup/';
import { cn, getBaseUrl } from '@/shared/utils/';
import Modal from '@/widgets/modal/Modal';
import { PATH } from '@/shared/const/PATH';

import s from './SignupForm.module.scss';

type Props = {
  className?: string;
};

export const SignupForm = ({ className }: Props) => {
  const baseUrl = getBaseUrl();

  const [isModalActive, setIsModalActive] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues
  } = useForm<FormSignUp>({ resolver: yupResolver(signUpSchema) });

  const [signUp, { isLoading, isSuccess, isError }] = useSignUpMutation();

  // TODO error handling
  // const errorText = error?.data?.message[0] ?? 'Unknown error occurred';
  // https://redux-toolkit.js.org/rtk-query/usage-with-typescript#inline-error-handling-example

  if (isError) {
    console.log('isError: ' + isError);
  }

  const onSubmit: SubmitHandler<FormSignUp> = ({ email, userName, password }) =>
    signUp({ email, userName, password, baseUrl });

  const handleGoogleAuthClick = () => {
    console.log('google');
  };
  const handleGithubAuthClick = () => {
    console.log('github');
  };

  useEffect(() => {
    if (isSuccess) {
      setIsModalActive(true);
    }
  }, [isSuccess]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn(s.form, className)}>
      <Card className={s.card}>
        <h1 className={s.title}>Sign Up</h1>
        <div className={s['auth-providers']}>
          <GoogleIconSvg onClick={handleGoogleAuthClick} className={s.icon} />
          <GithubIconSvg onClick={handleGithubAuthClick} className={s.icon} />
        </div>

        <Input
          label="Username"
          placeholder="Epam11"
          className={s.input}
          {...register('userName')}
          errorMessage={errors.userName?.message}
        />
        <Input
          type="email"
          label="Email"
          placeholder="Epam@epam.com"
          className={s.input}
          {...register('email')}
          errorMessage={errors.email?.message}
        />
        <Input
          type="password"
          label="Password"
          placeholder="********"
          className={s.input}
          {...register('password')}
          errorMessage={errors.password?.message}
        />
        <Input
          type="password"
          label="Confirm Password"
          placeholder="********"
          className={s.input}
          {...register('confirmPassword')}
          errorMessage={errors.confirmPassword?.message}
        />
        {/* TODO checkbox HOC for useForm */}
        <Checkbox
          label={'Agree to terms and conditions'}
          className={s.terms}
          onChange={(checked) => {
            setValue('terms', checked ? true : false);
          }}
        />
        <p className={s['terms-error']}>{errors.terms?.message}</p>

        <Button variant={'primary'} fullWidth className={s['signup-button']} type="submit" disabled={isLoading}>
          Sign Up
        </Button>

        <p className={s['have-account']}>Have an account?</p>
        <Button asChild variant={'ghost'} className={s['login-button']} disabled={isLoading}>
          <Link href={PATH.LOGIN}>Sign In</Link>
        </Button>
      </Card>
      {isModalActive && (
        <Modal title={'Email Sent'} className={s.modal} onClose={() => setIsModalActive(false)}>
          <p>We have sent a link to confirm your email to {getValues('email')}</p>
          <Button variant={'primary'} onClick={() => setIsModalActive(false)} className={s.button}>
            OK
          </Button>
        </Modal>
      )}
    </form>
  );
};
