'use client';

import { useParams } from 'next/navigation';
import { RegistrationConfirmation } from '@/features/signup/ui/RegistrationConfirmation';

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
