'use client';

import { useTranslations } from 'next-intl';
import s from './AddComentForm.module.scss';
import { Button } from '@internshipsamyrai44-ui-kit/components-lib';

export default function AddComentForm() {
  const t = useTranslations('Post');

  return (
    <div className={s.addComent}>
      <input className={s.input} placeholder={t('AddComment')} />
      <Button variant={'ghost'}>{t('CreatePost.Publish')}</Button>
    </div>
  );
}
