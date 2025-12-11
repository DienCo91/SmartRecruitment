import { NextRequest, NextResponse } from 'next/server';
import {
  ROLE_USER,
  ROUTER_ADMIN,
  ROUTER_CANDIDATE,
  ROUTER_EMPLOYER,
  ROUTER_GUESS,
} from './constants';

const ROLE_KEY = 'userRole';

function isAuthorized(path: string, role: string | undefined): boolean {
  let allowedRoutes: (string | ((slug: string) => string) | ((slug: number) => string))[] = [];

  switch (role) {
    case 'ADMIN':
      allowedRoutes = ROUTER_ADMIN;
      break;
    case 'CANDIDATE':
      allowedRoutes = ROUTER_CANDIDATE;
      break;
    case 'EMPLOYER':
      allowedRoutes = ROUTER_EMPLOYER;
      break;
    default:
      allowedRoutes = ROUTER_GUESS;
  }

  const matched = allowedRoutes.some(r => {
    if (typeof r === 'function') {
      const basePath = (r as (s: string) => string)('');
      return path.startsWith(basePath);
    }
    return path === r || path.startsWith(r + '/');
  });

  return matched;
}

export function middleware(req: NextRequest) {
  const role = req.cookies.get(ROLE_KEY)?.value;
  const pathname = req.nextUrl.pathname;

  const isAllowed = isAuthorized(pathname, role);

  if (!isAllowed) {
    if (!role) {
      return NextResponse.redirect(new URL('/login?error=unauthorized', req.url));
    }
    if (role === ROLE_USER.ADMIN) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }

    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Apply middleware to all routes except:
     * - static files
     * - API routes
     */
    '/((?!_next|favicon.ico|images|api).*)',
  ],
};
