'use client';

import { ComponentPropsWithoutRef } from 'react';
import Close from './svg/Close';
import s from './CloseButton.module.scss';

export default function CloseButton({ onClick }: ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={s.close} onClick={onClick}>
      <Close />
    </button>
  );
}
