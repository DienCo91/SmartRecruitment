'use client';
import { Button } from '@/components/ui/button';
import InputSearch, { InputSearchRef } from '@/components/ui/input-search';
import { useRef, useState } from 'react';
import { CustomPagination } from '../CustomPagination';
import DashBoardJobItem from './DashBoardJobItem';

interface IFavoriteJobsList {
  isEditing?: boolean;
}

const FavoriteJobsList: React.FC<IFavoriteJobsList> = ({ isEditing }) => {
  const [data, setData] = useState(Array(6).fill(''));
  const [page, setPage] = useState(1);
  const searchRef = useRef<InputSearchRef>(null);

  const handleSubmit = () => {
    console.log(searchRef.current?.getValue());
  };

  //TODO: implement delete
  const onDelete = (id: string) => {
    console.log('Delete');
  };

  return (
    <>
      <div className="flex mt-[32px]">
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
        {data.map((_, index) => (
          <DashBoardJobItem key={index} onDeleteById={isEditing ? onDelete : undefined} />
        ))}
      </div>
      <CustomPagination
        className="mt-[20px]"
        totalPages={10}
        currentPage={page}
        onPageChange={p => setPage(p)}
      />
    </>
  );
};

export default FavoriteJobsList;
