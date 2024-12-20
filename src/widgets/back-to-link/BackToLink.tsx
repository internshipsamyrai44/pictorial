import Link from 'next/link';
import { ArrowLeft } from '@/public/icons/ArrowLeft';
import s from './BackToLink.module.scss';

type BackToLink = {
  text: string;
  backHref: string;
};

export const BackToLink = ({ text, backHref }: BackToLink) => {
  return (
    <Link href={backHref} className={s['back-to-signup']}>
      <ArrowLeft width="24" height="24" />
      {text}
    </Link>
  );
};
