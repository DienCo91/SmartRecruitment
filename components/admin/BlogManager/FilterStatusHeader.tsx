import { CustomDropDown } from '@/components/Dropdown/CustomDropDown';
import { Button } from '@/components/ui/button';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Typography } from '@/components/ui/typography';
import { useBlogManager } from '@/contexts';
import { BlogStatus } from '@/types/blog';
import { CheckIcon, ListFilterIcon } from 'lucide-react';
import { useMemo } from 'react';

export function FilterStatusHeader() {
  const { filter, setFilter } = useBlogManager();

  const handleFilter = (status: BlogStatus) => {
    setFilter({
      ...filter,
      status,
      page: 1,
    });
  };

  const dot = useMemo(() => {
    switch (filter.status) {
      case BlogStatus.REQUESTED:
        return <span className="absolute top-2 right-2 size-2 bg-yellow-400 rounded-full" />;
      case BlogStatus.PUBLISHED:
        return <span className="absolute top-2 right-2 size-2 bg-green-400 rounded-full" />;
      default:
        return null;
    }
  }, [filter.status]);

  return (
    <CustomDropDown
      trigger={
        <Button variant="transparent" className="relative">
          <Typography variant="small">Trạng thái</Typography>
          <ListFilterIcon className="text-black" />
          {dot}
        </Button>
      }
    >
      <DropdownMenuItem
        className="text-sm hover:cursor-pointer flex items-center justify-between p-1 hover:bg-black/5"
        onClick={() => handleFilter(BlogStatus.REQUESTED)}
      >
        Đang chờ
        <CheckIcon size={16} opacity={filter.status == BlogStatus.REQUESTED ? 1 : 0} />
      </DropdownMenuItem>
      <DropdownMenuItem
        className="text-sm hover:cursor-pointer flex items-center justify-between p-1 hover:bg-black/5"
        onClick={() => handleFilter(BlogStatus.PUBLISHED)}
      >
        Đã duyệt
        <CheckIcon size={16} opacity={filter.status == BlogStatus.PUBLISHED ? 1 : 0} />
      </DropdownMenuItem>
    </CustomDropDown>
  );
}
