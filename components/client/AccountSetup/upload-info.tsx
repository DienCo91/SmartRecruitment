'use client';
import { AppImage } from '@/common';
import { cn } from '@/lib/utils';
import { Upload, FileText } from 'lucide-react';
import Image from 'next/image';
import React, { useRef } from 'react';

interface IUploadInfo {
  title: string;
  desc: string;
  className?: string;
  classNameDropWrap?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
  accept?: string;
  disabled?: boolean;
  initImage?: string;
}

const UploadInfo: React.FC<IUploadInfo> = ({
  title,
  desc,
  className,
  classNameDropWrap,
  value,
  accept = 'image/*',
  onChange,
  disabled,
  initImage = '',
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

  const isImage = value && value.type.startsWith('image/');

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
        {initImage && !value ? (
          <Image src={initImage} alt="preview" className="object-contain" fill />
        ) : value ? (
          isImage ? (
            <Image src={URL.createObjectURL(value)} alt="preview" className="object-contain" fill />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <FileText className="w-[48px] h-[56px] text-[#b0b4ba]" />
              <p className="text-sm font-medium">{value.name}</p>
              <p className="text-xs text-white">{(value.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          )
        ) : (
          <>
            <Upload className="w-[48px] h-[56px] text-[#b0b4ba]" />
            <div className="text-[14px]">
              <span className="font-[500]">Browse file </span>
              <span>or drop here</span>
            </div>
            <div className="text-[12px] opacity-[0.5] text-center">{desc}</div>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          disabled={disabled}
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default UploadInfo;
