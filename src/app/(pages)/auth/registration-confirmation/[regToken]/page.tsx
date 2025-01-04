'use client';

import { useParams } from 'next/navigation';
import { RegistrationConfirmation } from '@/features/auth/ui/registrationConfirmation/RegistrationConfirmation';

export default function Page() {
  const { regToken } = useParams();

  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <div style={style}>
      <RegistrationConfirmation token={regToken} />
    </div>
  );
}
