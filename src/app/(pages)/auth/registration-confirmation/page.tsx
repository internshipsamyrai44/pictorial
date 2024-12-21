'use client';

import { useSearchParams } from 'next/navigation';
import { RegistrationConfirmation } from '@/features/signup/ui/RegistrationConfirmation';

export default function Page() {
  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const email = searchParams.get('email');

  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <div style={style}>
      <RegistrationConfirmation token={code} email={email} />
    </div>
  );
}
