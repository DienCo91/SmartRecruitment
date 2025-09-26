import { Button } from '@/components/ui/button';
import { BriefcaseBusinessIcon } from 'lucide-react';
import React from 'react';
import { FaArrowRight, FaYoutube } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';

const CompanyOpenPosition = () => {
  return (
    <div className="flex backdrop-blur-md rounded-xl items-center overflow-hidden p-[16px] bg-white/10 shadow-md hover:bg-white/15 hover:shadow-lg transition-all duration-300 ease-in-out hover:translate-y-[-2px]">
      <div className="bg-red-500 h-[48px] w-[48px] flex justify-center items-center rounded-md">
        <FaYoutube className="size-[20px] text-white" />
      </div>
      <div className="ml-[16px] flex flex-1 flex-col">
        <h1 className="mb-[8px] text-[20px] font-bold">Youtube</h1>
        <div className="flex">
          <div className="flex items-center">
            <MdLocationPin size={14} />
            <span className="ml-[4px]">Canada</span>
          </div>
          <div className="flex items-center ml-[20px]">
            <BriefcaseBusinessIcon size={14} />
            <span className="ml-[4px]">3 việc làm</span>
          </div>
        </div>
      </div>

      <Button className="flex bg-[#c5defb] text-blue-primary hover:bg-blue-primary hover:text-white ">
        <span className="mr-[12px]">Open Position</span>
        <FaArrowRight />
      </Button>
    </div>
  );
};

export default CompanyOpenPosition;
