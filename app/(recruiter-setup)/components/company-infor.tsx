'use client';

import QuillCustom, { QuillCustomRef } from '@/components/quill';
import { Input } from '@/components/ui/input';
import { Separator } from '@radix-ui/react-separator';
import { useRef } from 'react';
import ButtonAccountSetup from './button-account-setup';
import UploadInfo from './upload-info';

interface ICompanyInfo {
  goToNext: () => void;
}

const CompanyInfo: React.FC<ICompanyInfo> = ({ goToNext }) => {
  const editorRef = useRef<QuillCustomRef>(null);

  return (
    <div className="mt-[32px]">
      <span className="text-[18px] font-[500]">Logo & Banner Image</span>
      <div className="flex mt-[16px]">
        <UploadInfo
          title="Upload document"
          desc="A photo larger than 400 pixels work best. Max photo size 5 MB."
          className="mr-[16px] w-[calc(30%-8px)]"
          classNameDropWrap="border-[2px] border-dashed"
        />
        <UploadInfo
          title="Banner Image"
          desc="Banner images optical dimension 1520x400. Supported format JPEG, PNG. Max photo size 5 MB."
          className="w-[calc(70%-8px)]"
        />
      </div>
      <Separator className="h-[1px] my-[20px] bg-[#E4E5E8]" />

      <div>
        <h1>Company name</h1>
        <Input
          type="text"
          placeholder="Company name ..."
          className="rounded-[6px] p-[8px] mt-[8px]"
        />
      </div>

      <div className="mt-[20px]">
        <h1 className="mb-[8px]">About us</h1>
        <QuillCustom ref={editorRef} />
      </div>

      <ButtonAccountSetup title="Save & Next" onClick={goToNext} />
    </div>
  );
};

export default CompanyInfo;
