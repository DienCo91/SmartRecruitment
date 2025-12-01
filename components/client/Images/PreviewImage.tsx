import { AppImage } from '@/common';
import { CustomImage } from './CustomImage';
import { XIcon } from 'lucide-react';

interface Props {
  fileImage: File | string;
  enableRemove?: boolean;
  onRemoveFile: () => void;
}

export function PreviewImage({ fileImage, onRemoveFile, enableRemove = false }: Props) {
  const url = typeof fileImage === 'string' ? fileImage : URL.createObjectURL(fileImage);

  return (
    <div className="relative">
      {enableRemove && (
        <XIcon
          size={24}
          className="absolute -top-2 -right-2 z-1 border rounded-full cursor-pointer bg-white text-gray-400 border-gray-400 hover:text-gray-300 hover:border-gray-300"
          onClick={onRemoveFile}
        />
      )}
      <CustomImage
        src={url}
        alt="Preview Image"
        fallback={AppImage.fallback.companyFallback.src}
        className="aspect-video size-full"
        classNameImage="object-cover"
      />
    </div>
  );
}
