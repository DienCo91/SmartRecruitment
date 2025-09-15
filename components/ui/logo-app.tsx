'use client';

import { cn } from '@/lib/utils';
import React from 'react';
import { FcBriefcase } from 'react-icons/fc';

interface ILogoApp {
  className?: string;
}

const LogoApp: React.FC<ILogoApp> = ({ className }) => {
  return (
    <div className={cn('flex items-center', className)}>
      <FcBriefcase className="mr-2 w-[40px] h-[40px]" />
      <h1 className="text-[24px] font-[600]">My Job</h1>
    </div>
  );
};

export default LogoApp;
