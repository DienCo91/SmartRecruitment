'use client';

import { Button } from '@/components/ui/button';
import { Router } from '@/constants';
import { CompanyItem } from '@/types';
import { BriefcaseBusinessIcon } from 'lucide-react';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { CustomImage } from '../Images/CustomImage';
import { AppImage } from '@/common';

const CompanyOpenPosition = ({ item }: { item: CompanyItem }) => {
  return (
    <div className="flex flex-wrap gap-2 backdrop-blur-md rounded-xl items-center overflow-hidden p-[16px] bg-white/10 shadow-md hover:bg-white/15 hover:shadow-lg transition-all duration-300 ease-in-out hover:translate-y-[-2px]">
      <CustomImage
        src={item?.logoUrl}
        fallback={AppImage.fallback.companyFallback.src}
        alt="thumbnail"
        className=" h-[80px] w-[80px] border-0 shadow-none"
        classNameImage="object-cover p-0"
      />
      <div className="ml-[16px] flex flex-1 flex-col">
        <h1 className="mb-[8px] text-[16px] font-bold">{item?.name}</h1>
        <div className="flex">
          <div className="flex items-center">
            <MdLocationPin size={14} />
            <span className="ml-[4px]">{item?.location.provinceCity}</span>
          </div>
          <div className="flex items-center ml-[20px]">
            <BriefcaseBusinessIcon size={14} />
            <span className="ml-[4px]">{item?.numberOfJobs} công việc</span>
          </div>
        </div>
      </div>

      <Button
        asChild
        className="flex bg-[#c5defb] text-blue-primary hover:bg-blue-primary hover:text-white"
      >
        <Link href={Router.FIND_COMPANY.DETAIL(item?.id)}>
          <span className="mr-[12px]">Open Position</span>
          <FaArrowRight />
        </Link>
      </Button>
    </div>
  );
};

export default CompanyOpenPosition;
