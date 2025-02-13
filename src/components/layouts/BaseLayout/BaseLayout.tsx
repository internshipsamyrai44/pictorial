import { ReactNode } from 'react';
import { GeneralHeader } from '@/widgets/general-header/GeneralHeader';
import s from './BaseLayout.module.scss';

type Props = {
  children: ReactNode;
};

export const BaseLayout = ({ children }: Props) => {
  return (
    <div>
      <GeneralHeader isAuth={false} />
      <main className={s.container}>
        <div className={s.content}>{children}</div>
      </main>
    </div>
  );
};
