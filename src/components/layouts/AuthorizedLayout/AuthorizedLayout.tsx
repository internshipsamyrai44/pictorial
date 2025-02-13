import { ReactNode } from 'react';
import { GeneralHeader } from '@/widgets/general-header/GeneralHeader';
import { SideNavPanel } from '@/widgets/side-nav-panel/SideNavPanel';
import s from './AuthorizedLayout.module.scss';

type Props = {
  children: ReactNode;
};

export const AuthorizedLayout = ({ children }: Props) => {
  return (
    <div className={s.layoutContainer}>
      <GeneralHeader isAuth />
      <main className={s.contentContainer}>
        <div className={s.nav}>
          <SideNavPanel />
        </div>
        <div className={s.content}>{children}</div>
      </main>
    </div>
  );
};
