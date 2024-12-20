import React from 'react';
import GoogleIconSvg from '@/shared/assets/icons/GoogleIconSvg';
import GithubIconSvg from '@/shared/assets/icons/GithubIconSvg';
import s from './OAuthBlock.module.scss';

export const OAuthBlock = () => {
  const handleGoogleAuthClick = (): void => {
    const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID_GOOGLE;
    const REDIRECT_URL = process.env.NEXT_PUBLIC_BASE_URL;
    const scope = 'email profile';
    const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=${scope}&response_type=code&redirect_uri=${REDIRECT_URL}&client_id=${CLIENT_ID}`;

    window.location.assign(url);
  };

  const handleGithubAuthClick = () => {
    const GITHUB_AUTH_URL = process.env.NEXT_PUBLIC_PATH_AUTH_GITHUB;

    window.location.assign(GITHUB_AUTH_URL as string);
  };

  return (
    <div className={s['auth-providers']}>
      <GoogleIconSvg onClick={handleGoogleAuthClick} className={s.icon} />
      <GithubIconSvg onClick={handleGithubAuthClick} className={s.icon} />
    </div>
  );
};
