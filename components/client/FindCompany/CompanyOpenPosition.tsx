'use client';

import { Button } from '@/components/ui/button';
import { IMAGE_BLUR, IMAGE_EMPTY, Router } from '@/constants';
import { CompanyItem } from '@/types';
import { BriefcaseBusinessIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';

const CompanyOpenPosition = ({ item }: { item: CompanyItem }) => {
  return (
    <div className="flex backdrop-blur-md rounded-xl items-center overflow-hidden p-[16px] bg-white/10 shadow-md hover:bg-white/15 hover:shadow-lg transition-all duration-300 ease-in-out hover:translate-y-[-2px]">
      <Image
        src={item?.logoUrl || IMAGE_EMPTY}
        alt="logo"
        width={54}
        height={54}
        className="rounded-md object-fill bg-gray-100 h-[54px] w-[54px]"
        placeholder="blur"
        blurDataURL={IMAGE_BLUR}
      />
      <div className="ml-[16px] flex flex-1 flex-col">
        <h1 className="mb-[8px] text-[20px] font-bold">{item?.name}</h1>
        <div className="flex">
          <div className="flex items-center">
            <MdLocationPin size={14} />
            <span className="ml-[4px]">{item?.location.provinceCity}</span>
          </div>
          <div className="flex items-center ml-[20px]">
            <BriefcaseBusinessIcon size={14} />
            <span className="ml-[4px]">{item?.numberOfJobs}</span>
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
