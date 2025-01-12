'use client';

import { SignupForm } from '@/features/auth/ui/signupForm/SignupForm';

export default function SignUp() {
  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  return (
    <div style={style}>
      <SignupForm />
    </div>
  );
}
