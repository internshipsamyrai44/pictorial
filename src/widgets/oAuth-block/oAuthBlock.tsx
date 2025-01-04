import React from 'react';
import GoogleIconSvg from '@/shared/assets/icons/GoogleIconSvg';
import GithubIconSvg from '@/shared/assets/icons/GithubIconSvg';
import { useGoogleAuth } from '@/shared/hooks/useGoogleAuth';
import s from './OAuthBlock.module.scss';

export const OAuthBlock = () => {
  const { login } = useGoogleAuth();

  const handleGoogleAuthClick = () => login();
  /* const handleGoogleAuthClick = (): void => {
    const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID_GOOGLE;
    const REDIRECT_URL = process.env.NEXT_PUBLIC_BASE_URL;

    if (!CLIENT_ID || !REDIRECT_URL) {
      console.error('Google Client ID or Redirect URL is missing!');
      return;
    }

    const scope = 'email profile';
    const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&response_type=code&redirect_uri=${REDIRECT_URL}&client_id=${CLIENT_ID}`;

    window.location.assign(url);
  };*/

  const handleGithubAuthClick = () => {
    window.location.assign('https://inctagram.work/api/v1/auth/github/login?http://localhost:3000/github');
  };

  return (
    <div className={s['auth-providers']}>
      <GoogleIconSvg onClick={handleGoogleAuthClick} className={s.icon} />
      <GithubIconSvg onClick={handleGithubAuthClick} className={s.icon} />
    </div>
  );
};
