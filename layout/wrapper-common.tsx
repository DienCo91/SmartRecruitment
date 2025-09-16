import { cn } from '@/lib/utils';
import React from 'react';

interface IWrapperCommon {
  classNameWrapper?: string;
  classNameInner?: string;
  children: React.ReactNode;
}

const WrapperCommon: React.FC<IWrapperCommon> = ({
  classNameWrapper,
  classNameInner,
  children,
}) => {
  return (
    <div className={cn('w-full bg-grey-primary flex justify-center', classNameWrapper)}>
      <div className={cn('w-[80%]', classNameInner)}>{children}</div>
    </div>
  );
};

export default WrapperCommon;
