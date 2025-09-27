'use client';
import { cn } from '@/lib/utils';
import { Upload } from 'lucide-react';
import Image from 'next/image';
import React, { useRef } from 'react';

interface IUploadInfo {
  title: string;
  desc: string;
  className?: string;
  classNameDropWrap?: string;
  value?: File | null; // nhận file để preview
  onChange?: (file: File | null) => void; // callback khi chọn file
}

const UploadInfo: React.FC<IUploadInfo> = ({
  title,
  desc,
  className,
  classNameDropWrap,
  value,
  onChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange?.(file);
    }
  };

  return (
    <div className={className}>
      <p className="text-[14px]">{title}</p>
      <div
        onClick={handleClick}
        className={cn(
          'h-[240px] bg-[#F1F2F466] flex flex-col items-center justify-center px-[20px] mt-[12px] cursor-pointer relative',
          classNameDropWrap
        )}
      >
        {value ? (
          <Image src={URL.createObjectURL(value)} alt="preview" className="object-contain" fill />
        ) : (
          <>
            <Upload className="w-[48px] h-[56px] text-[#b0b4ba]" />
            <div className="text-[14px]">
              <span className="font-[500]">Browse photo </span>
              <span>or drop here</span>
            </div>
            <div className="text-[12px] opacity-[0.5] text-center">{desc}</div>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default UploadInfo;
