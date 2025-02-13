import { ReactNode } from 'react';
import { AuthorizedLayout } from '@/components/layouts/AuthorizedLayout/AuthorizedLayout';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return <AuthorizedLayout>{children}</AuthorizedLayout>;
}
