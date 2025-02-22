'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './PasswordRecoveryPage.module.scss';
import passwordRecovery from '../../../../../public/images/passwordRecovery.svg';
import { PATH } from '@/shared/const/PATH';
import { useTranslations } from 'next-intl';

export const PasswordRecoveryPage = () => {
  const t = useTranslations('Auth');

  return (
    <>
      <div className={s.container}>
        <p className={s.header}>{t('LinkExpired')}</p>
        <div className={s.description}>{t('LinkExpiredDescription')}</div>
        <Link href={PATH.AUTH.FORGOT_PASSWORD}>
          <Button className={s.button}>{t('ResendLink')}</Button>
        </Link>
      </div>
      <Image src={passwordRecovery} alt={'Man with clocks'} />
    </>
  );
};
