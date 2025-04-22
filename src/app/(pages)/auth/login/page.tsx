'use client';

import { useLoginMutation } from '@/features/auth/api/authApi';
import { FormValidationSchema, LoginForm } from '@/features/auth/ui/loginForm/LoginForm';
import { PATH } from '@/shared/const/PATH';
import { getDecodedToken } from '@/shared/utils/getDecodedToken';
import { OAuthBlock } from '@/widgets/oAuth-block/oAuthBlock';
import { Alertpopup, Button, Card, LoaderLinear, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';

import s from '@/features/auth/ui/loginForm/LoginForm.module.scss';
import { useRequestError } from '@/shared/hooks/useRequestError';
import { useTranslations } from 'next-intl';
import { BaseLayout } from '@/components/layouts/BaseLayout/BaseLayout';

export default function SignIn() {
  const [login, { isError, isLoading, error }] = useLoginMutation();
  const errorMessage = useRequestError(error);
  const { replace } = useRouter();
  const t = useTranslations('Auth');

  const onSubmit: SubmitHandler<FormValidationSchema> = async ({ email, password }) => {
    try {
      const data = await login({ email: email!, password: password! }).unwrap();
      const userId = getDecodedToken(data.accessToken);
      // replace(`/profile/${userId}`);
      console.log(`${userId}`);
      replace(`/home`);
    } catch (error) {
      return <Alertpopup alertType={'error'} message={`${error}`} />;
    }
  };

  if (isLoading) return <LoaderLinear />;

  return (
    <>
      {errorMessage && <Alertpopup alertType={'error'} message={errorMessage} />}
      <BaseLayout>
        <Card className={s.card}>
          <Typography as="h1" variant="h1" className={s['sign-in-text']}>
            {t('signIn')}
          </Typography>

          <OAuthBlock />

          <LoginForm disabled={isLoading} onSubmit={onSubmit} isError={isError} />

          <Typography variant="regular-text-16" className={s['account-text']}>
            {t('accountText')}
          </Typography>
          <Button asChild variant="ghost" fullWidth>
            <Link href={PATH.AUTH.SIGNUP}>{t('signUp')}</Link>
          </Button>
        </Card>
      </BaseLayout>
    </>
  );
}
