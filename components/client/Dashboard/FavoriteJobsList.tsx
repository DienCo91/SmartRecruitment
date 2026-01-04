'use client';
import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
import { Button } from '@/components/ui/button';
import InputSearch, { InputSearchRef } from '@/components/ui/input-search';
import { JobFav } from '@/types';
import { useRef } from 'react';
import { CustomPagination } from '../CustomPagination';
import DashBoardJobItem from './DashBoardJobItem';

interface IFavoriteJobsList {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  data: JobFav[];
  page: number;
  handleSearch: (value: string) => void;
  loading?: boolean;
  total: number;
}

const FavoriteJobsList: React.FC<IFavoriteJobsList> = ({
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
          />
          <Button onClick={handleSubmit} size={'lg'}>
            Submit
          </Button>
        </div>
        <div className="space-y-4">
          {loading ? (
            <LoadingCircle className="mt-[100px]" />
          ) : data.length > 0 ? (
            data.map(item => <DashBoardJobItem key={item.id} item={item} />)
          ) : (
            <div className="flex items-center justify-center w-full h-full mt-[100px]">
              Not found
            </div>
          )}
        </div>
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

export default FavoriteJobsList;
