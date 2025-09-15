'use client';
import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';
import React from 'react';

interface IUploadInfo {
  title: string;
  desc: string;
  className?: string;
  classNameDropWrap?: string;
}

const UploadInfo: React.FC<IUploadInfo> = ({ title, desc, className, classNameDropWrap }) => {
  return (
    <div className={className}>
      <p className="text-[14px]">{title}</p>
      <div
        className={cn(
          'h-[240px] bg-[#F1F2F466] flex flex-col items-center justify-center px-[20px] mt-[12px]',
          classNameDropWrap
        )}
      >
        <Upload className="w-[48px] h-[48px] text-[#b0b4ba]" />
        <div className="text-[14px]">
          <span className="font-[500]">Browse photo </span>
          <span>or drop here</span>
        </div>
        <div className="text-[12px] opacity-[0.5] text-center">{desc}</div>
      </div>
    </div>
  );
};

export default UploadInfo;
