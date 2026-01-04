'use client';
import { ApplicationServices } from '@/services/application.services';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Ellipsis, Eye, FileText, Pencil, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import GlassCardBase from '../Cards/GlassCardBase';
import { GlassDialog } from '../Dialogs/GlassDialog';
import DashboardConfirmDeleteContent from './DashboardConfirmDeleteContent';
import DashboardConfirmDeleteFooter from './DashboardConfirmDeleteFooter';
import DashboardConfirmDeleteHeader from './DashboardConfirmDeleteHeader';
import DialogEditCV from './DialogEditCV';
import { ICvItem } from './DashboardSettingPersonal';

interface ICvItemProps {
  title: string;
  size: string;
  id: string;
  url: string;
  onDelete: () => void;
  setListCv: React.Dispatch<React.SetStateAction<ICvItem[]>>;
}

const CvItem: React.FC<ICvItemProps> = ({ title, size, id, onDelete, setListCv, url }) => {
  const [isShowDialog, setIsShowDialog] = useState(false);
  const [isShowDialogEditCV, setIsShowDialogEditCV] = useState<boolean>(false);

  const onCloseDialog = () => {
    setIsShowDialog(false);
  };

  const handleDelete = async () => {
    try {
      await ApplicationServices.deleteCV(id);
      onDelete();
    } catch (e) {
      console.log('e', e);
    } finally {
    }
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
          <button className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-0 transition-all ease-in duration-200">
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
              onSelect={() => window.open(url, '_blank')}
              className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 
                         hover:bg-blue-100 hover:text-blue-700 
                         focus:outline-none focus:ring-0"
            >
              <Eye className="w-4 h-4" />
              <span>View Detail</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onSelect={() => setIsShowDialogEditCV(true)}
              className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 
                         hover:bg-blue-100 hover:text-blue-700 
                         focus:outline-none focus:ring-0"
            >
              <Pencil className="w-4 h-4" />
              <span>Update CV</span>
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
          size="sm"
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

      <DialogEditCV
        isShow={isShowDialogEditCV}
        setIsShow={setIsShowDialogEditCV}
        setListCv={setListCv}
        name={title}
        size={size}
        id={id}
      />
    </GlassCardBase>
  );
};

export default CvItem;
