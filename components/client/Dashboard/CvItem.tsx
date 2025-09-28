import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Ellipsis, FileText, Pencil, Trash2 } from 'lucide-react';
import GlassCardBase from '../Cards/GlassCardBase';
import { useState } from 'react';
import { GlassDialog } from '../Dialogs/GlassDialog';
import DashboardConfirmDeleteHeader from './DashboardConfirmDeleteHeader';
import DashboardConfirmDeleteFooter from './DashboardConfirmDeleteFooter';
import DashboardConfirmDeleteContent from './DashboardConfirmDeleteContent';

interface ICvItem {
  title: string;
  size: string;
}

const CvItem: React.FC<ICvItem> = ({ title, size }) => {
  const [isShowDialog, setIsShowDialog] = useState(false);

  const onCloseDialog = () => {
    setIsShowDialog(false);
  };

  const handleDelete = () => {};

  const handleEdit = () => {
    console.log('Edit clicked');
  };

  return (
    <GlassCardBase className="flex flex-row items-center justify-between">
      <div className="flex items-center gap-3">
        <FileText className="text-blue-500" size={32} />
        <div>
          <h1 className="font-semibold text-[14px]">{title}</h1>
          <span className="text-[12px] text-gray-400">{size}</span>
        </div>
      </div>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-0">
            <Ellipsis size={20} />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            sideOffset={8}
            className="z-50 w-40 rounded-md bg-white shadow-md overflow-hidden cursor-pointer"
          >
            <DropdownMenu.Item
              onSelect={handleEdit}
              className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 
                         hover:bg-blue-100 hover:text-blue-700 
                         focus:outline-none focus:ring-0"
            >
              <Pencil className="w-4 h-4" />
              <span>Edit Resume</span>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              onSelect={() => setIsShowDialog(true)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 
                         hover:bg-red-100 hover:text-red-700 
                         focus:outline-none focus:ring-0"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {isShowDialog && (
        <GlassDialog
          size="xl"
          open
          onClose={onCloseDialog}
          title={<DashboardConfirmDeleteHeader />}
          footer={
            <DashboardConfirmDeleteFooter onCancel={onCloseDialog} onConfirm={handleDelete} />
          }
        >
          <DashboardConfirmDeleteContent />
        </GlassDialog>
      )}
    </GlassCardBase>
  );
};

export default CvItem;
