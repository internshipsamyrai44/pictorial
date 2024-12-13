'use client';

import { Button, Card, Checkbox, Input } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './style.module.scss';
import GoogleIconSvg from '@/shared/assets/icons/GoogleIconSvg';
import GithubIconSvg from '@/shared/assets/icons/GithubIconSvg';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const { push } = useRouter();
  const handleGoogleAuthClick = () => {
    console.log('google');
  };
  const handleGithubAuthClick = () => {
    console.log('github');
  };

  return (
    <Card className={s.card}>
      <h1 className={s.title}>Sign Up</h1>
      <div className={s['auth-providers']}>
        <GoogleIconSvg onClick={handleGoogleAuthClick} className={s.icon} />
        <GithubIconSvg onClick={handleGithubAuthClick} className={s.icon} />
      </div>
      <Input type="text" name="username" label="Username" placeholder="Epam11" className={s.input} />
      <Input type="email" name="email" label="Email" placeholder="Epam@epam.com" className={s.input} />
      <Input type="password" name="password" label="Password" placeholder="********" className={s.input} />
      <Input
        type="password"
        name="confirmPassword"
        label="Confirm Password"
        placeholder="********"
        className={s.input}
      />

      <Checkbox label={'Agree to terms and conditions'} className={s.terms} />
      <Button variant={'primary'} fullWidth className={s['signup-button']}>
        Sign Up
      </Button>
      <p className={s['have-account']}>Have an account?</p>
      <Button variant={'outlined'} onClick={() => push('/login')} className={s['login-button']}>
        Sign In
      </Button>
    </Card>
  );
}
