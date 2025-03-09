import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { PATH } from './shared/const/PATH';

export function middleware(request: NextRequest) {
  // publicPaths can be a string or a regex
  const publicPaths = [
    PATH.GITHUB,
    PATH.AUTH.LOGIN,
    PATH.AUTH.FORGOT_PASSWORD,
    PATH.AUTH.REGISTRATION_CONFIRMATION,
    PATH.AUTH.TERMS_OF_SERVICE,
    PATH.AUTH.PRIVACY_POLICY,
    PATH.AUTH.RECOVERY,
    PATH.MAIN,
    PATH.AUTH.SIGNUP,
    PATH.AUTH.VERIFICATION_LINK_EXPIRED,
    PATH.PUBLIC.PUBLIC_PAGE,
    PATH.PUBLIC.PUBLIC_USER
  ];
  const { pathname } = request.nextUrl;

  if (publicPaths.some((path) => (typeof path === 'string' ? path === pathname : path.test(pathname)))) {
    return NextResponse.next();
  }

  const encryptedToken = request.cookies.get('accessToken')?.value;

  if (!encryptedToken) {
    return NextResponse.redirect(new URL(PATH.AUTH.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
