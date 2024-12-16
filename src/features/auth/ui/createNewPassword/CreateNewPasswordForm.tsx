'use client';

import * as yup from 'yup';
import { Button, Card, Input } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './CreateNewPasswordForm.module.scss';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { getPasswordValidationSchema } from '@/shared/utils/PasswordValidationSchema';
import { useCreateNewPasswordMutation } from '@/features/auth/api/authApi';
import { useSearchParams } from 'next/navigation';

type FormInput = {
  new_password: string;
  password_confirmation: string;
};

export const CreateNewPasswordForm = () => {
  const [createNewPassword] = useCreateNewPasswordMutation();
  const searchParams = useSearchParams();

  const formValidationSchema = yup.object({
    new_password: getPasswordValidationSchema(),
    password_confirmation: yup.string().oneOf([yup.ref('new_password')], 'Passwords do not match')
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
    // @ts-ignore
  } = useForm<FormInput>({ resolver: yupResolver(formValidationSchema), mode: 'onTouched' });

  const sendNewPassword = (data: FormInput) => {
    const patch = {
      newPassword: data.new_password,
      recoveryCode: searchParams.get('code') || ''
    };
    createNewPassword(patch);
  };

  return (
    <>
      <Card className={s.card}>
        <form onSubmit={handleSubmit(sendNewPassword)} className={s.form}>
          <p className={s.header}>Forgot Password</p>
          <Input
            {...register('new_password')}
            type="password"
            label={'New password'}
            errorMessage={errors.new_password?.message}
          />
          <Input
            {...register('password_confirmation')}
            type="password"
            label={'Password confirmation'}
            errorMessage={errors.password_confirmation?.message}
          />
          <span className={s.description}>Your password must be between 6 and 20 characters</span>
          <Button className={s.button} disabled={!isValid}>
            Create new password
          </Button>
        </form>
      </Card>
    </>
  );
};
