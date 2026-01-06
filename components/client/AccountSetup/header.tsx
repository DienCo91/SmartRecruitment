'use client';
import LogoApp from '@/components/ui/logo-app';
import { Progress } from '@/components/ui/progress';
import { useProgressAccountSetup } from '@/contexts';
import React from 'react';

const HeaderAccountSetup = () => {
  const { progress } = useProgressAccountSetup();
  return (
    <div className="flex justify-between mt-[30px] flex-wrap gap-2 space-x-4">
      <LogoApp />
      <div className="min-w-[240px]">
        <div className="flex justify-between text-[14px] text-[#767F8C]">
          <span>Tiến trình</span>
          <span className="text-primary">{progress}% Hoàn Thành</span>
        </div>
        <Progress value={progress} className="w-full mt-[6px] bg-[#E7F0FA] " />
      </div>
    </div>
  );
};

export default React.memo(HeaderAccountSetup);
