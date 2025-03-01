'use client';

import { useSearchParams } from 'next/navigation';
import { RegistrationConfirmation } from '@/features/auth/ui/registrationConfirmation/RegistrationConfirmation';
import { Suspense } from 'react';
import { Loader } from '@/shared/ui/loader/Loader';

export default function Page() {
  return (
    <Suspense fallback={<Loader />}>
      <RegistrationConfirmationWrapper />
    </Suspense>
  );
}

const RegistrationConfirmationWrapper = () => {
  const searchParams = useSearchParams();

  const code = searchParams.get('code');
  const email = searchParams.get('email');

  return <RegistrationConfirmation token={code} email={email} />;
};
