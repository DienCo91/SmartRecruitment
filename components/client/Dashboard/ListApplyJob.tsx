'use client';
import { Button } from '@/components/ui/button';
import InputSearch, { InputSearchRef } from '@/components/ui/input-search';
import { useRef } from 'react';
import GlassCardBase from '../Cards/GlassCardBase';
import { CustomPagination } from '../CustomPagination';
import ApplyJobItem from './ApplyJobItem';
import { AppliedJobResponse } from '@/types';
import { LoadingCircle } from '@/components/Loadings/LoadingCircle';

interface IListApplyJob {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  data: AppliedJobResponse[];
  page: number;
  handleSearch: (value: string) => void;
  loading?: boolean;
  total: number;
}

const ListApplyJob: React.FC<IListApplyJob> = ({
  data,
  page,
  setPage,
  handleSearch,
  loading,
  total,
}) => {
  const searchRef = useRef<InputSearchRef>(null);

  const handleSubmit = () => {
    handleSearch(searchRef.current?.getValue() || '');
  };

  const totalPage = Math.ceil(total / 10); // 10 items per page

  return (
    <div className="mt-[32px] min-h-[600px] flex flex-col justify-between ">
      <div>
        <div className="flex">
          <InputSearch
            ref={searchRef}
            className="border-[1px] mr-[32px] mb-[32px] rounded-md "
            placeholder="Search"
            iconClassName="text-white"
            onKeyDown={e => {
              if (e.key === 'Enter') handleSubmit();
            }}
          />
          <Button onClick={handleSubmit} size={'lg'}>
            Submit
          </Button>
        </div>
        <GlassCardBase className="grid grid-cols-[2.5fr_1fr_1fr_1fr] text-sm font-semibold  px-8 py-3 rounded-sm bg-white/30 hover:bg-white/30 hover:translate-y-[0px]">
          <div>JOBS</div>
          <div className="">DATE APPLIED</div>
          <div className="">STATUS</div>
          <div className="">ACTION</div>
        </GlassCardBase>
      </div>

      <div className="space-y-4 flex-1">
        {loading ? (
          <LoadingCircle className="mt-[100px]" />
        ) : data.length > 0 ? (
          data.map((item, index) => <ApplyJobItem key={item.id + '-' + index} item={item} />)
        ) : (
          <div className="flex items-center justify-center w-full h-full mt-[100px]">Not found</div>
        )}
      </div>

      {totalPage > 1 ? (
        <CustomPagination
          className="mt-[20px]"
          totalPages={totalPage}
          currentPage={page}
          onPageChange={p => setPage(p)}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ListApplyJob;
