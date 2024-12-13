'use client';

import { Button, Card, Checkbox, Input } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './style.module.scss';
import GoogleIconSvg from '@/shared/assets/icons/GoogleIconSvg';
import GithubIconSvg from '@/shared/assets/icons/GithubIconSvg';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getEmailValidationSchema, getPasswordValidationSchema } from '@/shared/utils/';

const schema = yup
  .object({
    username: yup.string().max(20, 'Username must be at most 20 characters').required('Username is required'),
    email: getEmailValidationSchema(),
    password: getPasswordValidationSchema(),
    confirmPassword: yup
      .string()
      .required('Confirm password is required')
      .oneOf([yup.ref('password')], 'Passwords must match'),
    terms: yup.boolean().required().isTrue('You must accept the terms and conditions')
  })
  .required();

type FormInput = yup.InferType<typeof schema>;

export default function SignUp() {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormInput>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormInput> = (data) => console.log(data);

  const handleGoogleAuthClick = () => {
    console.log('google');
  };
  const handleGithubAuthClick = () => {
    console.log('github');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          {...register('username')}
          errorMessage={errors.username?.message}
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
            setValue('terms', checked);
          }}
        />
        <p className={s['terms-error']}>{errors.terms?.message}</p>
        <Button variant={'primary'} fullWidth className={s['signup-button']} type="submit">
          Sign Up
        </Button>
        <p className={s['have-account']}>Have an account?</p>
        <Button variant={'outlined'} onClick={() => push('/login')} className={s['login-button']}>
          Sign In
        </Button>
      </Card>
    </form>
  );
}
