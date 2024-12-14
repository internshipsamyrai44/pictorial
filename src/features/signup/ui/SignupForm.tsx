import GoogleIconSvg from '@/shared/assets/icons/GoogleIconSvg';
import GithubIconSvg from '@/shared/assets/icons/GithubIconSvg';
import { Button, Card, Checkbox, Input } from '@internshipsamyrai44-ui-kit/components-lib';

import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import s from './SignupForm.module.scss';
import { FormSignUp, signUpSchema } from '../model/validationScheme';
import { useSignUpMutation } from '../api/signUpApi';
import { getBaseUrl } from '@/shared/utils/';
import Modal from '@/widgets/modal/Modal';
import { useEffect, useState } from 'react';

interface Props {
  className?: string;
}

export const SignupForm = ({ className }: Props) => {
  const baseUrl = getBaseUrl();
  const { push } = useRouter();

  const [isModalActive, setIsModalActive] = useState<boolean>(false);

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

  useEffect(() => {
    if (isSuccess) {
      setIsModalActive(true);
    }
  }, [isSuccess]);

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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`${s.form} ${className}`}>
      <Card className={s.card}>
        <h1 className={s.title}>Sign Up</h1>
        <div className={s['auth-providers']}>
          <GoogleIconSvg onClick={handleGoogleAuthClick} className={s.icon} />
          <GithubIconSvg onClick={handleGithubAuthClick} className={s.icon} />
        </div>

        <Input
          type="text"
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
        <Checkbox
          label={'Agree to terms and conditions'}
          className={s.terms}
          onChange={(checked) => {
            console.log('checked: ' + checked);
            setValue('terms', checked ? true : false);
          }}
        />
        <p className={s['terms-error']}>{errors.terms?.message}</p>

        <Button variant={'primary'} fullWidth className={s['signup-button']} type="submit" disabled={isLoading}>
          Sign Up
        </Button>

        <p className={s['have-account']}>Have an account?</p>
        <Button variant={'outlined'} onClick={() => push('/login')} className={s['login-button']} disabled={isLoading}>
          Sign In
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
