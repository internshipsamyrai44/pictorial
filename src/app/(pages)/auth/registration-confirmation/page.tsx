'use client';

import { useSearchParams } from 'next/navigation';
import { RegistrationConfirmation } from '@/features/auth/ui/registrationConfirmation/RegistrationConfirmation';
import { Suspense } from 'react';
import { LoaderLinear } from '@internshipsamyrai44-ui-kit/components-lib';

export default function Page() {
  return (
    <div style={style}>
      <Suspense fallback={<LoaderLinear />}>
        <RegistrationConfirmationWrapper />
      </Suspense>
    </div>
  );
}

const RegistrationConfirmationWrapper = () => {
  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const email = searchParams.get('email');

  return <RegistrationConfirmation token={code} email={email} />;
};

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};
