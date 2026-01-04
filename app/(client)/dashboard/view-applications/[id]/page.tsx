'use client';

import ApplicationDialogDetail, {
  ApplicationDialogDetailRef,
} from '@/components/client/Dashboard/ApplicationDialogDetail';
import ApplicationFilter, {
  ApplicationFilterInputSearchRef,
} from '@/components/client/Dashboard/ApplicationFilter';
import { ApplicationList } from '@/components/client/Dashboard/ApplicationList';
import DashboardHeader from '@/components/client/Dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { ApplicationBriefResponse, DataFilter } from '@/types';
import { MoveRight } from 'lucide-react';
import { useRef, useState } from 'react';

const ViewApplication = (props: PageProps<'/dashboard/view-applications/[id]'>) => {
  const [dataFilter, setDataFilter] = useState<DataFilter | undefined>({
    appropriate: 0,
    gender: '',
    ageRange: '0-100',
    language: '',
  });

  const dialogRef = useRef<ApplicationDialogDetailRef>(null);

  const filterOptionRef = useRef<ApplicationFilterInputSearchRef | null>(null);

  const handleClearFilter = () => {
    filterOptionRef.current?.clearValue();
  };
  const handleApply = () => {
    setDataFilter(filterOptionRef.current?.getValue());
  };

  const onViewDetailApplication = (item: ApplicationBriefResponse) => {
    dialogRef.current?.setValue(item);
  };

  return (
    <>
      <DashboardHeader title="Danh sách đơn xin việc">
        <div className="space-x-4">
          <ApplicationFilter ref={filterOptionRef} />
          <Button
            variant="outline"
            className="text-sidebar-foreground cursor-pointer border-none"
            onClick={handleClearFilter}
          >
            Clear
          </Button>
        </div>
      </DashboardHeader>
      <div className="flex space-x-[32px] items-center">
        <ApplicationList title="Đơn đã nộp" onViewDetailApplication={onViewDetailApplication} />
        <div>
          <Button
            size="lg"
            onClick={handleApply}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <span>Áp dụng bộ lọc</span>
            <MoveRight className="w-4 h-4" />
          </Button>
          <br />
        </div>
        <ApplicationList
          title="Đơn đã lọc"
          params={dataFilter}
          onViewDetailApplication={onViewDetailApplication}
        />
      </div>
      <ApplicationDialogDetail ref={dialogRef} />
    </>
  );
};

export default ViewApplication;
