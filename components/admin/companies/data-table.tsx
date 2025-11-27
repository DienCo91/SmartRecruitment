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
import Link from 'next/link';
import { format } from 'date-fns';

const data: Payment[] = [
  {
    id: 'm5gr84i9',
    createAt: 316,
    status: 'success',
    email: 'ken99@example.com',
    companyName: 'Công ty ABC',
  },
  {
    id: '3u1reuv4',
    createAt: 242,
    status: 'success',
    email: 'Abe45@example.com',
    companyName: 'Công ty XYZ',
  },
  {
    id: 'derv1ws0',
    createAt: 837,
    status: 'processing',
    email: 'Monserrat44@example.com',
    companyName: 'Công ty Minh Phát',
  },
  {
    id: '5kma53ae',
    createAt: 874,
    status: 'success',
    email: 'Silas22@example.com',
    companyName: 'Công ty Hoàng Long',
  },
  {
    id: 'bhqecj4p',
    createAt: 721,
    status: 'failed',
    email: 'carmella@example.com',
    companyName: 'Công ty Đại Lộc',
  },
  {
    id: 'm5gr84i9',
    createAt: 316,
    status: 'success',
    email: 'ken99@example.com',
    companyName: 'Công ty ABC',
  },
  {
    id: '3u1reuv4',
    createAt: 242,
    status: 'success',
    email: 'Abe45@example.com',
    companyName: 'Công ty XYZ',
  },
  {
    id: 'derv1ws0',
    createAt: 837,
    status: 'processing',
    email: 'Monserrat44@example.com',
    companyName: 'Công ty Minh Phát',
  },
  {
    id: 'm5gr84i9',
    createAt: 316,
    status: 'success',
    email: 'ken99@example.com',
    companyName: 'Công ty ABC',
  },
  {
    id: '3u1reuv4',
    createAt: 242,
    status: 'success',
    email: 'Abe45@example.com',
    companyName: 'Công ty XYZ',
  },
  {
    id: 'derv1ws0',
    createAt: 837,
    status: 'processing',
    email: 'Monserrat44@example.com',
    companyName: 'Công ty Minh Phát',
  },
  {
    id: 'm5gr84i9',
    createAt: 316,
    status: 'success',
    email: 'ken99@example.com',
    companyName: 'Công ty ABC',
  },
  {
    id: '3u1reuv4',
    createAt: 242,
    status: 'success',
    email: 'Abe45@example.com',
    companyName: 'Công ty XYZ',
  },
  {
    id: 'derv1ws0',
    createAt: 837,
    status: 'processing',
    email: 'Monserrat44@example.com',
    companyName: 'Công ty Minh Phát',
  },
  {
    id: 'm5gr84i9',
    createAt: 316,
    status: 'success',
    email: 'ken99@example.com',
    companyName: 'Công ty ABC',
  },
  {
    id: '3u1reuv4',
    createAt: 242,
    status: 'success',
    email: 'Abe45@example.com',
    companyName: 'Công ty XYZ',
  },
  {
    id: 'derv1ws0',
    createAt: 837,
    status: 'processing',
    email: 'Monserrat44@example.com',
    companyName: 'Công ty Minh Phát',
  },
];

export type Payment = {
  id: string;
  createAt: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
  companyName: string;
};

const getColumns = (
  setShowConfirmDialog: (v: boolean) => void,
  setIdCompanyDelete: (v: string) => void
): ColumnDef<Payment>[] => [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <div className="capitalize">{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => <div className="capitalize">{row.getValue('status')}</div>,
  },
  {
    accessorKey: 'companyName',
    header: 'Company Name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('companyName')}</div>,
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
    accessorKey: 'createAt',
    header: () => <div className="text-right">Create At</div>,
    cell: ({ row }) => {
      const date = new Date(row.getValue('createAt'));
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

            <DropdownMenuItem>
              <Link href={`/admin/companies/${row.getValue('id')}`}>View Detail</Link>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-[red] hover:text-[red]!"
              onClick={() => {
                setIdCompanyDelete(row.getValue('id'));
                setShowConfirmDialog(true);
              }}
            >
              Delete Account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [showConfirmDialog, setShowConfirmDialog] = React.useState(false);
  const [idCompanyDelete, setIdCompanyDelete] = React.useState('');

  const columns = React.useMemo(() => getColumns(setShowConfirmDialog, setIdCompanyDelete), []);

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

  function handleDelete() {
    console.log('Delete: ', idCompanyDelete);
    setShowConfirmDialog(false);
  }

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
          title="Bạn có chắc muốn xóa"
          description="Hành động này sẽ xóa company và không thể khôi phục"
          onClose={() => setShowConfirmDialog(false)}
          onDelete={() => handleDelete()}
        />
      )}
    </div>
  );
}
