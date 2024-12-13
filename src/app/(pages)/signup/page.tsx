'use client';

import { SignupForm } from '@/features/signup/ui/SignupForm';

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
