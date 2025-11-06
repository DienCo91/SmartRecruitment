import { LoaderIcon } from 'lucide-react';
import React from 'react';

const LoadingCustom = () => {
  return (
    <div className="fixed inset-0 z-99 flex items-center justify-center bg-black/50">
      <LoaderIcon className="animate-spin size-[60px] text-white" />
    </div>
  );
};

export default LoadingCustom;
