import { ReactNode } from 'react';
import { AdaptiveLayout } from '@/components/layouts/AdaptiveLayout/AdaptiveLayout';

type Props = {
  children: ReactNode;
};

export default function Layout({ children }: Props) {
  return <AdaptiveLayout>{children}</AdaptiveLayout>;
}
