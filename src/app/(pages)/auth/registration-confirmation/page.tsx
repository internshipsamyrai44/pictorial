'use client';

import { useSearchParams } from 'next/navigation';
import { RegistrationConfirmation } from '@/features/auth/ui/registrationConfirmation/RegistrationConfirmation';

export default function Page() {
  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const email = searchParams.get('email');

  return (
    <div style={style}>
      <RegistrationConfirmation token={code} email={email} />
    </div>
  );
}

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};
