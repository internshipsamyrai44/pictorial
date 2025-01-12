import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { PATH } from './shared/const/PATH';

export function middleware(request: NextRequest) {
  const publicPaths = [
    PATH.AUTH.LOGIN,
    PATH.AUTH.FORGOT_PASSWORD,
    PATH.AUTH.REGISTRATION_CONFIRMATION,
    PATH.AUTH.TERMS_OF_SERVICE,
    PATH.AUTH.PRIVACY_POLICY,
    PATH.AUTH.RECOVERY,
    PATH.MAIN,
    PATH.AUTH.SIGNUP,
    PATH.AUTH.VERIFICATION_LINK_EXPIRED
  ];
  const { pathname } = request.nextUrl;

  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  const encryptedToken = request.cookies.get('refreshToken')?.value || '';

  if (!encryptedToken) {
    return NextResponse.redirect(new URL(PATH.AUTH.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
