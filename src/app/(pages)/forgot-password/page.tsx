import Link from 'next/link';

export default function ForgotPassword() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <p>Forgot Password</p>
      <span>Email</span>
      <input type="text" />
      <span>Enter your email address and we will send you further instructions </span>
      <button style={{ cursor: 'pointer', backgroundColor: 'blue' }}>Send Link</button>
      <Link href={'/login'}>Back to Sign In</Link>
    </div>
  );
}
