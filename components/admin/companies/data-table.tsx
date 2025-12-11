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
import { IEmployerDashboard } from '@/types';
import { format } from 'date-fns';
import { AdminService } from '@/services/admin.services';
import { toast } from 'sonner';
import { ModalDetailEmployer } from './modal-detail-employer';

const getColumns = (
  setShowConfirmDialog: (v: boolean) => void,
  setIdCandidateAction: (v: string) => void,
  setShowDetailUserModel: (v: string) => void
): ColumnDef<IEmployerDashboard>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div className="capitalize">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'logoUrl',
    header: 'Avatar',
    cell: ({ row }) => (
      <AvatarUser
        src={row.getValue('logoUrl')}
        classNameImage="object-cover"
        className="border-none w-[48px] h-[48px]"
      />
    ),
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
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
    accessorKey: 'name',
    header: 'Company Name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
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
    header: () => <div className="text-right">Create At</div>,
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
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuItem
              onClick={() => {
                console.log('1', row.getValue('id'));
                setShowDetailUserModel(row.getValue('id'));
              }}
            >
              View Detail
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
  data: IEmployerDashboard[];
  setData: React.Dispatch<React.SetStateAction<IEmployerDashboard[]>>;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [idCompanyAction, setIdCompanyAction] = React.useState('');
  const [showDetailUserModel, setShowDetailUserModel] = React.useState<string>();

  const columns = React.useMemo(
    () => getColumns(setShowConfirmDialog, setIdCompanyAction, setShowDetailUserModel),
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
    const itemPickCurrent = data.find(item => item.id === idCompanyAction);

    try {
      if (itemPickCurrent?.isActive) {
        await AdminService.deactivateCompany(+idCompanyAction);
        setData(prev =>
          prev.map(item => {
            if (item.id === idCompanyAction) {
              return {
                ...item,
                isActive: false,
              };
            }
            return item;
          })
        );
      } else {
        await AdminService.activateCompany(+idCompanyAction);
        setData(prev =>
          prev.map(item => {
            if (item.id === idCompanyAction) {
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
          placeholder="Filter emails..."
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
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-black"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {showConfirmDialog && (
        <ConfirmDeleteDialog
          title="Bạn có chắc không ?"
          description="Hành động này sẽ ảnh hưởng đến company cũng như người dùng trong ứng dụng của bạn"
          onClose={() => setShowConfirmDialog(false)}
          onDelete={() => handleDelete()}
          textConfirm="Đồng ý"
        />
      )}

      <ModalDetailEmployer id={showDetailUserModel} setIsOpen={setShowDetailUserModel} />
    </div>
  );
}
