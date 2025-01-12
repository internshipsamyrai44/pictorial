'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';
import s from './PasswordRecoveryPage.module.scss';
import passwordRecovery from '../../../../../public/images/passwordRecovery.svg';
import { PATH } from '@/shared/const/PATH';

export const PasswordRecoveryPage = () => {
  return (
    <>
      <div className={s.container}>
        <p className={s.header}>Email verification link expired</p>
        <div className={s.description}>
          Looks like the verification link has expired. Not to worry, we can send the link again
        </div>
        <Link href={PATH.AUTH.FORGOT_PASSWORD}>
          <Button className={s.button}>Resend Link</Button>
        </Link>
      </div>
      <Image src={passwordRecovery} alt={'Man with clocks'} />
    </>
  );
};
