'use client';

import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { CardContent } from '@/components/ui/card';
import { Router } from '@/constants';
import { JobItem } from '@/types';
import { getLabelJobType } from '@/utils';
import { formatNumber } from '@/utils/common';
import { MapPin } from 'lucide-react';
import Link from 'next/link';
import { LuDot } from 'react-icons/lu';
import InfiniteScroll from 'react-infinite-scroll-component';
import GlassCardBase from '../Cards/GlassCardBase';
import Image from 'next/image';

interface IListJob {
  items: JobItem[];
  hasMore: boolean;
  fetchMoreData: () => void;
}

const ListJob = ({ items = [], hasMore, fetchMoreData }: IListJob) => {
  return (
    <div className="mt-[30px] hover:translate-y-[0px] ">
      <GlassCardBase className="text-white font-bold text-[20px] mb-[20px]">Việc Làm</GlassCardBase>

      {!hasMore && items && items.length === 0 && (
        <div className="flex flex-col justify-center items-center py-20 text-gray-400">
          <p className="text-lg">Không tìm thấy công việc nào phù hợp</p>
        </div>
      )}
      <div
        id="scrollableDiv"
        className="overflow-auto mb-[20px]"
        style={{ height: 'calc(100vh - 240px)' }}
      >
        <InfiniteScroll
          className="pt-[8px]"
          dataLength={items?.length}
          next={fetchMoreData}
          scrollableTarget="scrollableDiv"
          hasMore={hasMore}
          loader={<LoadingCircle className={`${!items.length && 'h-[40vh]'} `} />}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(job => (
              <Link key={job.id} href={Router.JOB.DETAIL(job.slug)}>
                <GlassCardBase className="hover:shadow-md hover:shadow-blue-200 cursor-pointer border-[1px] hover:border-blue-primary transition-all duration-300 ease-in-out hover:-translate-y-1">
                  <CardContent>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div>
                          <Image
                            src={job.companyLogoUrl}
                            alt="Logo"
                            width={50}
                            height={50}
                            className="rounded-md object-cover flex-shrink-0 "
                            unoptimized
                          />
                        </div>
                        <div>
                          <span className="font-semibold">{job.companyName}</span>
                          <div className="flex items-center text-sm text-gray-500 mb-2 opacity-80">
                            <MapPin size={14} className="mr-1 shrink-0 text-white" />
                            <span className="line-clamp-1 text-white">{job.provinceCity}</span>
                          </div>
                        </div>
                      </div>
                      {/* {job.featured && (
                      <Badge
                        variant="secondary"
                        className="ml-[6px] bg-red-100 text-red-600 rounded-full font-normal"
                      >
                        Featured
                      </Badge>
                    )} */}
                    </div>

                    <h3 className="font-bold text-lg mb-2">{job.jobTitle}</h3>
                    <div className="flex items-center item opacity-80 ">
                      <div className="text-sm">{getLabelJobType(job.jobType)}</div>
                      <LuDot className="mx-[4px]" />
                      <div className="text-sm ">
                        ${formatNumber(job.minSalary)} - ${formatNumber(job.maxSalary)}
                      </div>
                    </div>
                  </CardContent>
                </GlassCardBase>
              </Link>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ListJob;
