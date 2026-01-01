'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import * as React from 'react';

import { AvatarUser } from '@/components/client/Avatar/AvatarUser';
import { ConfirmDeleteDialog } from '@/components/client/Dialogs/ConfirmDeleteDialog';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { AdminService } from '@/services/admin.services';
import { ICandidateDashboard } from '@/types';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { ModalDetailCandidate } from './modal-detail-candidate';

const getColumns = (
  setShowConfirmDialog: (v: boolean) => void,
  setIdCandidateAction: (v: string) => void,
  setShowDetailUserModel: (v: string) => void
): ColumnDef<ICandidateDashboard>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div className="capitalize">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'avatarUrl',
    header: 'Avatar',
    cell: ({ row }) => (
      <AvatarUser
        src={row.getValue('avatarUrl')}
        classNameImage="object-cover"
        className="border-none w-[48px] h-[48px]"
      />
    ),
  },
  {
    accessorKey: 'isActive',
    header: 'Trạng thái',
    cell: ({ row }) => (
      <div
        className={cn(
          !row.getValue('isActive')
            ? 'text-[red] hover:text-[red]!'
            : 'text-[green] hover:text-[green]!'
        )}
      >
        {row.getValue('isActive') ? 'Active' : 'Inactive'}
      </div>
    ),
  },
  {
    accessorKey: 'fullName',
    header: 'Tên ứng viên',
    cell: ({ row }) => <div className="capitalize">{row.getValue('fullName')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Email <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'createdAt',
    header: () => <div className="text-right">Ngày tạo</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt') ?? Date.now());
      const formatted = format(date, 'dd/MM/yyyy');

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Hành động</DropdownMenuLabel>

            <DropdownMenuItem onClick={() => setShowDetailUserModel(row.getValue('id'))}>
              Xem chi tiết
            </DropdownMenuItem>

            <DropdownMenuItem
              className={cn(
                row.getValue('isActive')
                  ? 'text-[red] hover:text-[red]!'
                  : 'text-[green] hover:text-[green]!'
              )}
              onClick={() => {
                setIdCandidateAction(row.getValue('id'));
                setShowConfirmDialog(true);
              }}
            >
              {row.getValue('isActive') ? 'Inactive' : 'Active'}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableDemo({
  data,
  setData,
}: {
  data: ICandidateDashboard[];
  setData: React.Dispatch<React.SetStateAction<ICandidateDashboard[]>>;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [idCandidateAction, setIdCandidateAction] = React.useState('');
  const [showDetailUserModel, setShowDetailUserModel] = React.useState<string>();

  const columns = React.useMemo(
    () => getColumns(setShowConfirmDialog, setIdCandidateAction, setShowDetailUserModel),
    []
  );

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleDelete = async () => {
    const itemPickCurrent = data.find(item => item.id === +idCandidateAction);

    try {
      if (itemPickCurrent?.isActive) {
        await AdminService.deactivateCandidate(+idCandidateAction);
        setData(prev =>
          prev.map(item => {
            if (item.id === +idCandidateAction) {
              return {
                ...item,
                isActive: false,
              };
            }
            return item;
          })
        );
      } else {
        await AdminService.activateCandidate(+idCandidateAction);
        setData(prev =>
          prev.map(item => {
            if (item.id === +idCandidateAction) {
              return {
                ...item,
                isActive: true,
              };
            }
            return item;
          })
        );
      }
    } catch (e) {
      console.log('e', e);
    } finally {
      toast.success('Successfully');
      setShowConfirmDialog(false);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Tìm kiếm theo email"
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={event => table.getColumn('email')?.setFilterValue(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="text-black"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Trang trước
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-black"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Trang tiếp
          </Button>
        </div>
      </div>

      {showConfirmDialog && (
        <ConfirmDeleteDialog
          title="Bạn có chắc không ?"
          description="Hành động này sẽ ảnh hưởng đến người dùng trong ứng dụng của bạn"
          onClose={() => setShowConfirmDialog(false)}
          onDelete={() => handleDelete()}
          textConfirm="Đồng Ý"
        />
      )}

      <ModalDetailCandidate id={showDetailUserModel} setIsOpen={setShowDetailUserModel} />
    </div>
  );
}
