import { PATH } from '@/shared/const/PATH';
import { getEmailValidationSchema, getPasswordValidationSchema } from '@/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import s from './LoginForm.module.scss';

const formValidationSchema = yup.object().shape({
  email: getEmailValidationSchema(),
  password: getPasswordValidationSchema()
});

export type FormValidationSchema = yup.InferType<typeof formValidationSchema>;

type LoginFormProps = {
  disabled?: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmit: (formData: FormValidationSchema) => void;
  isError: boolean;
};

export const LoginForm = ({ disabled, onSubmit, isError }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid }
  } = useForm<FormValidationSchema>({
    resolver: yupResolver(formValidationSchema),
    mode: 'onTouched'
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={s.form}>
      {/* Input for email */}
      <Input
        type="email"
        label="Email"
        placeholder="Email"
        disabled={disabled}
        {...register('email')}
        onBlur={async () => {
          await trigger('email');
        }}
        errorMessage={(isError || errors.email) && ''}
      />

      {/* Input for password */}
      <Input
        className={s.password}
        type="password"
        label="Password"
        placeholder="********"
        disabled={disabled}
        {...register('password')}
        onBlur={async () => {
          await trigger('password');
        }}
        errorMessage={
          (isError || errors.password || errors.email) && 'The email or password are incorrect. Try again please'
        }
      />

      {/* Forgot password link */}
      <div className={s['forgot-password-wrapper']}>
        <Link href={PATH.AUTH.FORGOT_PASSWORD}>
          <Typography className={s['forgot-password']}>Forgot Password</Typography>
        </Link>
      </div>

      {/* Submit button */}
      <Button variant="primary" fullWidth type="submit" disabled={disabled || !isValid}>
        Sign In
      </Button>
    </form>
  );
};
