'use client';

import { Messenger } from '@/features/messenger/ui/messenger';
import s from './page.module.scss';
import { useMeQuery } from '@/features/auth/api/authApi';

export default function DirectPage() {
  const { data: me } = useMeQuery();

  return (
    <div className={s.container}>
      {me ? (
        <>
          <h1 className={s.title}>Messenger </h1>
          <Messenger user={me} />
        </>
      ) : (
        <div className={s.error}>Ошибка загрузки пользователя</div>
      )}
    </div>
  );
}
