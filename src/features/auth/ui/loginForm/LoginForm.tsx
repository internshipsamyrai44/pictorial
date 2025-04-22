import { PATH } from '@/shared/const/PATH';
import { getEmailValidationSchema, getPasswordValidationSchema } from '@/shared/utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Input, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import s from './LoginForm.module.scss';
import { useTranslations } from 'next-intl';

const getPasswordErrorKey = (message: string): string => {
  if (message.includes('required')) return 'required';
  if (message.includes('Minimum number of characters')) return 'min';
  if (message.includes('Maximum number of characters')) return 'max';
  if (message.includes('Password must contain at least one digit')) return 'specialChars';
  if (message.includes('The password contains invalid characters')) return 'invalidChars';
  return 'required';
};

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
    formState: { errors }
  } = useForm<FormValidationSchema>({
    resolver: yupResolver(formValidationSchema),
    mode: 'onTouched'
  });
  const t = useTranslations('Auth');

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
        errorMessage={errors.email?.message === 'Email is required' ? t('EmailErrors.required') : undefined}
      />

      {/* Input for password */}
      <Input
        className={s.password}
        type="password"
        label={t('Password')}
        placeholder="⭑⭑⭑⭑⭑⭑⭑⭑⭑⭑⭑⭑⭑⭑⭑⭑⭑"
        disabled={disabled}
        {...register('password', {
          onChange: () => {
            trigger('password');
          }
        })}
        onBlur={async () => {
          await trigger('password');
        }}
        errorMessage={
          errors.password?.message
            ? t(`PasswordErrors.${getPasswordErrorKey(errors.password.message)}`)
            : isError && !errors.password
              ? t('PasswordValidation')
              : undefined
        }
      />

      {/* Forgot password link */}
      <div className={s['forgot-password-wrapper']}>
        <Link href={PATH.AUTH.FORGOT_PASSWORD}>
          <Typography className={s['forgot-password']}>{t('ForgotPassword')}</Typography>
        </Link>
      </div>

      {/* Submit button */}
      <Button variant="primary" fullWidth type="submit" disabled={disabled}>
        {t('signIn')}
      </Button>
    </form>
  );
};
