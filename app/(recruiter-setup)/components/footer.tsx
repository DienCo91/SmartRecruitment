import { Separator } from '@/components/ui/separator';
import React from 'react';

const Footer = () => {
  return (
    <div className="w-full mt-[140px]">
      <Separator className="h-[1px] w-full bg-[#E4E5E8]" />
      <div className="py-[24px] opacity-60 text-[14px] text-center">
        @ 2024 MyJob - Job Portal. All rights Reserved
      </div>
    </div>
  );
};

export default Footer;
