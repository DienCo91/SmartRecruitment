'use client';

import { AppImage } from '@/common';
import { Notifications } from '@/components/Notifications/Notifications';
import { Button } from '@/components/ui/button';
import { ROLE_USER, Router } from '@/constants';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { ShortUserInfo } from '../Avatar/ShortUserInfo';

const reload = () => window.location.reload();

const SiteAll = [
  { name: 'Trang chủ', path: Router.HOME },
  { name: 'Công ty', path: Router.FIND_COMPANY.LIST },
  { name: 'Ứng viên', path: Router.FIND_CANDIDATE.LIST },
  { name: 'Dashboard', path: Router.DASHBOARD.OVERVIEW },
];

export function NavBar() {
  const currentUser = useAppSelector((state: RootState) => state.auth.currentUser);

  const sites = useMemo(() => {
    switch (currentUser?.role) {
      case ROLE_USER.ADMIN:
        return SiteAll;
      case ROLE_USER.CANDIDATE:
        return SiteAll.filter(site => site.name !== 'Ứng viên');
      case ROLE_USER.EMPLOYER:
        return SiteAll.filter(site => site.name !== 'Công ty');
      default:
        return SiteAll.filter(site => site.name === 'Trang chủ');
    }
  }, [currentUser?.role]);

  const pathName = usePathname();

  return (
    <div
      className="flex sticky top-0 left-0 w-full items-center justify-between h-13 
                  font-semibold text-sm bg-[#1d2954] shadow-xl z-[10] text-neutral-200"
    >
      <div className="flex w-full max-w-7xl mx-auto items-center justify-between">
        <div className="flex gap-5 items-center">
          <Image src={AppImage.logo} alt="Logo" className="size-10" onClick={reload} />
          {sites.map((site, index) => {
            const isActive = site.path === '/' ? pathName === '/' : pathName.startsWith(site.path);

            return (
              <Link key={index} href={site.path}>
                <Button
                  variant="ghost"
                  className={cn(
                    'hover:bg-[#2d3b69] hover:cursor-pointer hover:text-neutral-100 bg-transparent rounded-xs',
                    isActive
                      ? 'text-blue-500 border-b-2 border-blue-500 pb-2 pointer-events-none'
                      : ''
                  )}
                >
                  {site.name}
                </Button>
              </Link>
            );
          })}
        </div>
        {currentUser?.role ? (
          <div className="flex gap-3">
            <Notifications />
            <ShortUserInfo />
          </div>
        ) : (
          <div className="flex items-center ">
            <Button variant={'link'} className="text-blue-500">
              <Link href={Router.AUTH.LOGIN}>Login</Link>
            </Button>
            <div>or</div>
            <Button variant={'link'} className="text-blue-500">
              <Link href={Router.AUTH.REGISTER}>Register</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
