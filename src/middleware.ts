import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PATH } from './shared/const/PATH';

export function middleware(request: NextRequest) {
  const publicPaths = [
    PATH.LOGIN,
    PATH.FORGOT_PASSWORD,
    PATH.REGISTRATION_CONFIRMATION,
    PATH.TERMS_OF_SERVICE,
    PATH.PRIVACY_POLICY,
    PATH.RECOVERY,
    PATH.MAIN,
    PATH.SIGNUP,
    PATH.VERIFICATION_LINK_EXPIRED
  ];
  const { pathname } = request.nextUrl;

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const encryptedToken = request.cookies.get('refreshToken')?.value || '';

  if (!encryptedToken) {
    return NextResponse.redirect(new URL(PATH.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
