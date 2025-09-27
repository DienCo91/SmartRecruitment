import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import React from 'react';

interface IButtonAccountSetup extends React.ComponentProps<'button'> {
  className?: string;
  title: string;
  isPrevious?: boolean;
}

const ButtonAccountSetup: React.FC<IButtonAccountSetup> = ({
  title,
  className,
  isPrevious = false,
  ...props
}) => {
  return (
    <Button
      size="lg"
      className={cn(
        `bg-blue-primary rounded-[4px] mt-[20px] !px-[32px] !py-[16px] hover:shadow-sm ${isPrevious && 'bg-[#F1F2F4] text-black hover:bg-[#f1f2f4be]'}`,
        className
      )}
      {...props}
    >
      <span className="mr-[4px]">{title}</span>
      {!isPrevious && <ArrowRight />}
    </Button>
  );
};

export default ButtonAccountSetup;
