'use client';

import { AppImage } from '@/common';
import { Notifications } from '@/components/Notifications/Notifications';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShortUserInfo } from '../Avatar/ShortUserInfo';
import { Button } from '@/components/ui/button';

const reload = () => window.location.reload();

export function NavBar() {
  const Sites = [
    {
      name: 'Trang chủ',
      path: '/',
    },
    {
      name: 'Công ty',
      path: '/company',
    },
    {
      name: 'Ứng viên',
      path: '/candidate',
    },
    {
      name: 'Hỗ trợ',
      path: '/customer-support',
    },
  ];

  const pathName = usePathname();

  return (
    <div
      className="flex sticky top-0 left-0 w-full items-center justify-between h-13 
                  font-semibold text-sm bg-[#1d2954] shadow-xl z-[10] text-neutral-200"
    >
      <div className="flex w-full max-w-7xl mx-auto items-center justify-between">
        <div className="flex gap-5 items-center">
          <Image src={AppImage.logo} alt="Logo" className="size-10" onClick={reload} />
          {Sites.map((site, index) => (
            <Link key={index} href={site.path}>
              <Button
                variant="ghost"
                className={cn(
                  'hover:bg-[#2d3b69] hover:cursor-pointer hover:text-neutral-100 bg-transparent rounded-xs',
                  pathName === site.path
                    ? 'text-blue-500 border-b-2 border-blue-500 pb-2 pointer-events-none'
                    : ''
                )}
              >
                {site.name}
              </Button>
            </Link>
          ))}
        </div>
        <div className="flex gap-3">
          <Notifications />
          <ShortUserInfo />
        </div>
      </div>
    </div>
  );
}
