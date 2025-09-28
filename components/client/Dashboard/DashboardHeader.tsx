'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface DashboardHeaderProps {
  title: string;
  count?: number | string;
  className?: string;
  children?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, count, className, children }) => {
  return (
    <div className={cn('flex items-center gap-2 justify-between', className)}>
      <div>
        <span className="font-bold text-white">{title}</span>
        {count !== undefined && <span className="text-white">({count})</span>}
      </div>

      {children}
    </div>
  );
};

export default DashboardHeader;
