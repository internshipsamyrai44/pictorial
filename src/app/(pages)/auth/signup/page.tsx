'use client';

import { SignupForm } from '@/features/auth/ui/signupForm/SignupForm';
import { CSSProperties } from 'react';

export default function SignUp() {
  const style: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '24px'
  };

  return (
    <div style={style}>
      <SignupForm />
    </div>
  );
}
