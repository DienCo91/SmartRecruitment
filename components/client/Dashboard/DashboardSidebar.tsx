'use client';
import { CANDIDATE_DASHBOARD, EMPLOYER_DASHBOARD } from '@/constants/dashboard';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { isEmployer } from '@/utils';
import React from 'react';
import { GlassCard } from '../Cards/GlassCard';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const DashboardSidebar = () => {
  const pathname = usePathname();
  const currentUser = useAppSelector((state: RootState) => state.auth.currentUser);

  if (!currentUser) return null;

  const data = isEmployer(currentUser.role) ? EMPLOYER_DASHBOARD : CANDIDATE_DASHBOARD;

  return (
    <GlassCard
      title={data.title}
      className="py-[16px] px-[24px] overflow-hidden"
      classContentName="p-0"
    >
      <div className="flex flex-col">
        {data.items.map(item => {
          const isActive = pathname === item.link;
          return (
            <Link
              href={item.link}
              key={item.title}
              className={`flex space-x-[20px] py-[12px] px-[20px] cursor-pointer hover:bg-white/10 border-l-[4px]  transition-all duration-100 ease-in-out hover:font-bold ${
                isActive
                  ? 'bg-white/10 border-blue-primary font-bold  border-l-[4px]'
                  : 'border-transparent'
              }`}
            >
              {item.icon}
              <span className="ml-[16px] tex-[14px]">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </GlassCard>
  );
};

export default DashboardSidebar;
