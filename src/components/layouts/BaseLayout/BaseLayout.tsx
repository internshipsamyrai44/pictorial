import { ReactNode } from 'react';
import { GeneralHeader } from '@/widgets/general-header/GeneralHeader';

type Props = {
  children: ReactNode;
};

export const BaseLayout = ({ children }: Props) => {
  return (
    <div>
      <GeneralHeader isAuth={true} />
      <main>
        <div>{children}</div>
      </main>
    </div>
  );
};
