'use client';

import { ROLE_USER, ROUTER_CANDIDATE, ROUTER_EMPLOYER, ROUTER_GUESS, Router } from '@/constants';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { redirect, usePathname } from 'next/navigation';
import { useLayoutEffect } from 'react';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const pathname = usePathname();
  const currentUser = useAppSelector((state: RootState) => state.auth.currentUser);
  const role = currentUser?.role;

  useLayoutEffect(() => {
    if (!pathname) return;

    if (role === ROLE_USER.ADMIN) return;

    let allowedRoutes: (string | ((slug: string) => string) | ((slug: number) => string))[] = [];

    switch (role) {
      case ROLE_USER.CANDIDATE:
        allowedRoutes = ROUTER_CANDIDATE;
        break;
      case ROLE_USER.EMPLOYER:
        allowedRoutes = ROUTER_EMPLOYER;
        break;
      default:
        allowedRoutes = ROUTER_GUESS;
    }

    const matched = allowedRoutes.some(r => {
      if (typeof r === 'function') {
        const basePath = (r as (s: string) => string)('');
        return pathname.startsWith(basePath);
      }
      return pathname === r || pathname.startsWith(r + '/');
    });

    if (!matched) {
      if (!role) redirect(Router.AUTH.LOGIN);
      redirect(Router.HOME);
    }
  }, [pathname, role]);

  return <>{children}</>;
};

export default ProtectedRoute;
