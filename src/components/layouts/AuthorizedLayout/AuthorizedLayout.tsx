import { GeneralHeader } from '@/widgets/general-header/GeneralHeader';
import { SideNavPanel } from '@/widgets/side-nav-panel/SideNavPanel';
import { ReactNode } from 'react';
import s from './AuthorizedLayout.module.scss';

type Props = {
  children: ReactNode;
};

export const AuthorizedLayout = ({ children }: Props) => {
  return (
    <div className={s.layoutContainer}>
      <GeneralHeader isAuth />
      <main className={s.contentContainer}>
        <SideNavPanel className={s.sidebar} />
        <div className={s.content}>{children}</div>
      </main>
    </div>
  );
};
