'use client';

import ApplicationFilter, {
  ApplicationFilterInputSearchRef,
} from '@/components/client/Dashboard/ApplicationFilter';
import { ApplicationList } from '@/components/client/Dashboard/ApplicationList';
import DashboardHeader from '@/components/client/Dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import React, { use, useRef } from 'react';

const ViewApplication = (props: PageProps<'/dashboard/view-applications/[id]'>) => {
  const { id } = use(props.params);
  console.log('🚀 ~ ViewApplication ~ id:', id);

  const filterOptionRef = useRef<ApplicationFilterInputSearchRef | null>(null);

  const handleClearFilter = () => {
    filterOptionRef.current?.clearValue();
  };

  return (
    <>
      <DashboardHeader title="Danh sách đơn xin việc">
        <div className="space-x-4">
          <ApplicationFilter ref={filterOptionRef} />
          <Button
            variant="outline"
            className="text-blue-primary cursor-pointer"
            onClick={handleClearFilter}
          >
            Clear
          </Button>
        </div>
      </DashboardHeader>
      <div className="flex space-x-[32px] items-center">
        <ApplicationList title="Đơn đã nộp" />
        <div>
          <Button
            size="lg"
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <span>Áp dụng bộ lọc</span>
            <MoveRight className="w-4 h-4" />
          </Button>
          <br />
          <p className="text-[12px] text-center">CV sẽ được tự động lọc hằng ngày</p>
        </div>
        <ApplicationList title="Đơn đã lọc" />
      </div>
    </>
  );
};

export default ViewApplication;
