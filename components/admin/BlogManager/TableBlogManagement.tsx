import { DataTable } from '@/components/client/Tables/DataTable';
import { useBlogManager } from '@/contexts';
import { useBlogManagerActions } from '@/hooks/useBlogManagerActions';
import { columnsAdminBlog } from './Columns';

export function TableBlogManagement() {
  const { filter, setFilter } = useBlogManager();
  const { useBlogManageQuery } = useBlogManagerActions(filter);

  return (
    <DataTable
      columns={columnsAdminBlog(filter)}
      data={useBlogManageQuery.data?.data ?? []}
      pagination={useBlogManageQuery.data?.meta ?? { page: filter.page, limit: filter.limit }}
      setPagination={pagination =>
        setFilter({ ...filter, page: pagination.page, limit: pagination.limit })
      }
      isLoading={useBlogManageQuery.isLoading}
    />
  );
}
