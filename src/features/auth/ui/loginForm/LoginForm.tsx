import React from 'react';
import { Button, Card, Input, Typography } from '@internshipsamyrai44-ui-kit/components-lib';
import GoogleIconSvg from '@/shared/assets/icons/GoogleIconSvg';
import GithubIconSvg from '@/shared/assets/icons/GithubIconSvg';
import Link from 'next/link';
import s from './LoginForm.module.scss';

export const LoginForm = () => {
  return (
    <form>
      <Card>
        <Typography as={'h1'} variant={'h1'}>
          Sign Ip
        </Typography>
        <div className={s['auth-providers']}>
          <GoogleIconSvg className={s.icon} />
          <GithubIconSvg className={s.icon} />
        </div>
        <Input type="email" label="Email" placeholder="Email" />
        <Input type="password" label="Password" placeholder="********" />
        <Button variant={'primary'} fullWidth type="submit">
          Sign Ip
        </Button>
        <Link href={'/auth/forgot-password'}>
          <Typography>Forgot Password</Typography>
        </Link>
        <Button asChild variant={'primary'}>
          <Link href={'/auth/login'}>Sign In</Link>
        </Button>
        <Typography>Don’t have an account?</Typography>
        <Button asChild variant={'ghost'}>
          <Link href={'/auth/signup'}>Sign Up</Link>
        </Button>
      </Card>
    </form>
  );
};
