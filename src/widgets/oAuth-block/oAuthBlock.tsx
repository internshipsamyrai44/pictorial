import { PATH } from '@/shared/const/PATH';
import { useGoogleAuth } from '@/shared/hooks/useGoogleAuth';
import Link from 'next/link';
import GithubIconSvg from '../../../public/icons/GithubIconSvg';
import GoogleIconSvg from '../../../public/icons/GoogleIconSvg';
import s from './OAuthBlock.module.scss';

export const OAuthBlock = () => {
  const { login } = useGoogleAuth();

  const handleGoogleAuthClick = () => login();

  return (
    <div className={s['auth-providers']}>
      <GoogleIconSvg onClick={handleGoogleAuthClick} className={s.icon} />
      <Link href={PATH.GITHUB}>
        <GithubIconSvg className={s.icon} />
      </Link>
    </div>
  );
};
