import { GeneralHeader } from '@/widgets/general-header/GeneralHeader';
import { ReactNode } from 'react';
import s from './BaseLayout.module.scss';

type Props = {
  children: ReactNode;
};

export const BaseLayout = ({ children }: Props) => {
  return (
    <div>
      <GeneralHeader isPublic={false} />
      <main className={s.container}>
        <div className={s.content}>{children}</div>
      </main>
    </div>
  );
};
