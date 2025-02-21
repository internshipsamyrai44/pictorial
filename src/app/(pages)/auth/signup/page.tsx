'use client';

import { BaseLayout } from '@/components/layouts/BaseLayout/BaseLayout';
import { SignupForm } from '@/features/auth/ui/signupForm/SignupForm';

export default function SignUp() {
  return (
    <BaseLayout>
      <SignupForm />
    </BaseLayout>
  );
}
