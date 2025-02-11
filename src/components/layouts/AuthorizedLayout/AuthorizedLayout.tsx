import { ReactNode } from 'react';
import { GeneralHeader } from '@/widgets/general-header/GeneralHeader';

type Props = {
  children: ReactNode;
};

export const AuthorizedLayout = ({ children }: Props) => {
  return (
    <div>
      <GeneralHeader isAuth />
      <main>
        <div>{children}</div>
      </main>
    </div>
  );
};
