import { yupResolver } from '@hookform/resolvers/yup';
import { Alertpopup, Button, Card, Input, Modal, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { PATH } from '@/shared/const/PATH';
import { cn, getBaseUrl } from '@/shared/utils';

import { useRequestError } from '@/shared/hooks/useRequestError';

import { useSignUpMutation } from '@/features/auth/api/authApi';
import { FormSignUp, signUpSchema } from '@/features/auth/model/validationScheme';
import { CheckboxControl } from '@/shared/ui/сontrolled';
import { OAuthBlock } from '@/widgets/oAuth-block/oAuthBlock';
import s from './SignupForm.module.scss';
import { useTranslations } from 'next-intl';

type Props = {
  className?: string;
};

export const SignupForm = ({ className }: Props) => {
  const baseUrl = getBaseUrl();
  const [isModalActive, setIsModalActive] = useState(false);
  const t = useTranslations('Auth');

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    control
  } = useForm<FormSignUp>({ resolver: yupResolver(signUpSchema) });

  const [signUp, { isLoading, isSuccess, error }] = useSignUpMutation();

  const errorMessage = useRequestError(error);

  const onSubmit: SubmitHandler<FormSignUp> = ({ email, userName, password }) =>
    signUp({ email, userName, password, baseUrl });

  useEffect(() => {
    if (isSuccess) {
      setIsModalActive(true);
    }
  }, [isSuccess]);

  return (
    <>
      {errorMessage && <Alertpopup alertType={'error'} message={errorMessage} />}
      <form onSubmit={handleSubmit(onSubmit)} className={cn(s.form, className)}>
        <Card className={s.card}>
          <Typography as={'h1'} variant={'h1'}>
            {t('signUp')}
          </Typography>
          <OAuthBlock />

          <Input
            label={t('Username')}
            placeholder="Epam11"
            className={s.input}
            {...register('userName')}
            errorMessage={errors.userName?.message}
            disabled={isLoading}
          />
          <Input
            type="email"
            label="Email"
            placeholder="Epam@epam.com"
            className={s.input}
            {...register('email')}
            errorMessage={errors.email?.message}
            disabled={isLoading}
          />
          <Input
            type="password"
            label={t('Password')}
            placeholder="✶✶✶✶✶✶✶✶✶"
            className={s.input}
            {...register('password')}
            errorMessage={errors.password?.message}
            disabled={isLoading}
          />
          <Input
            type="password"
            label={t('ConfirmPassword')}
            placeholder="✶✶✶✶✶✶✶✶✶"
            className={s.input}
            {...register('confirmPassword')}
            errorMessage={errors.confirmPassword?.message}
            disabled={isLoading}
          />
          <CheckboxControl
            label={t('TermsAndConditions')}
            className={s.terms}
            control={control}
            name="terms"
            disabled={isLoading}
          />
          {errors.terms?.message && <p className={s['terms-error']}>{errors.terms?.message}</p>}

          <Button variant={'primary'} fullWidth className={s['signup-button']} type="submit" disabled={isLoading}>
            {t('signUp')}
          </Button>

          <p className={s['have-account']}>{t('HaveAnAccount')}</p>
          <Button asChild variant={'ghost'} className={s['login-button']} disabled={isLoading} fullWidth>
            <Link href={PATH.AUTH.LOGIN}>{t('signIn')}</Link>
          </Button>
        </Card>
        {isModalActive && (
          <Modal title={'Email Sent'} className={s.modal} onClose={() => setIsModalActive(false)}>
            <p>
              {t('EmailConfirmationLinkSent')}
              {getValues('email')}
            </p>
            <Button variant={'primary'} onClick={() => setIsModalActive(false)} className={s.button}>
              OK
            </Button>
          </Modal>
        )}
      </form>
    </>
  );
};
