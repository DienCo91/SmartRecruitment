import React from 'react';
import GlassCardBase from '../Cards/GlassCardBase';
import { CircleCheckBig, CircleX, EllipsisVertical, Eye, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import Link from 'next/link';
import { Router } from '@/constants';
import { MyJobPageResponse } from '@/types';
import { useRouter } from 'next/navigation';

interface IMyJobItem {
  item: MyJobPageResponse;
  onMakeItExpire: () => void;
}

const MyJobItem: React.FC<IMyJobItem> = ({ item, onMakeItExpire }) => {
  const router = useRouter();

  const isExpired = item.status === 'EXPIRED';

  return (
    <GlassCardBase className="grid grid-cols-[2fr_1fr_1.5fr_1.5fr] items-center text-[12px] font-bold cursor-pointer">
      <div>
        <h1
          className="text-[16px] font-bold line-clamp-2"
          onClick={() => router.push(Router.JOB.DETAIL(item.slug))}
        >
          {item.title}
        </h1>
        <div>
          <span>{item.status}</span>
          <span> • </span>
          <span>{Math.max(+item.daysRemaining, 0)} days remaining</span>
        </div>
      </div>
      <div className="flex items-center">
        {isExpired || Number(item.daysRemaining) <= 0 ? (
          <>
            <CircleX size={18} color="#E05151" />
            <span className="text-[#E05151] ml-[8px]">Expire</span>
          </>
        ) : (
          <>
            <CircleCheckBig size={18} color="#10ce39" />
            <span className="text-[#10ce39] ml-[8px]">Active</span>
          </>
        )}
      </div>
      <div className="flex items-center">
        <Users size={18} />
        <span className="ml-[8px]">{item.numberOfApplications} Applications</span>
      </div>
      <div className="flex items-center">
        <Link href={Router.DASHBOARD.VIEW_APPLICATIONS(item.id)}>
          <Button className="cursor-pointer">View Applications</Button>
        </Link>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-0">
              <EllipsisVertical size={20} />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              align="end"
              sideOffset={8}
              className="z-50 w-40 rounded-md bg-white shadow-md overflow-hidden cursor-pointer"
            >
              <Link href={Router.JOB.DETAIL(item.slug)}>
                <DropdownMenu.Item
                  className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 
                         hover:bg-blue-100 hover:text-blue-700 
                         focus:outline-none focus:ring-0"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Detail</span>
                </DropdownMenu.Item>
              </Link>

              {!isExpired && Number(item.daysRemaining) > 0 && (
                <DropdownMenu.Item
                  onSelect={onMakeItExpire}
                  className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 
                         hover:bg-red-100 hover:text-red-700 
                         focus:outline-none focus:ring-0"
                >
                  <CircleX className="w-4 h-4" />
                  <span>Make it Expire</span>
                </DropdownMenu.Item>
              )}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </GlassCardBase>
  );
};

export default MyJobItem;
