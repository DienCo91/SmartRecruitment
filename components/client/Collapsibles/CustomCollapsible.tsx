import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { BaseProps } from '@/types';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { ReactNode, useState } from 'react';

interface Props extends BaseProps {
  title: ReactNode;
  children: ReactNode;
  contentClassName?: string;
}

export function CustomCollapsible({ title, children, className, contentClassName }: Props) {
  const [open, setOpen] = useState<boolean>(true);
  const TriggerButton = (
    <Button
      onClick={() => setOpen(!open)}
      className="bg-transparent hover:bg-white/10 hover:cursor-pointer"
    >
      {open ? <ChevronDownIcon size={18} /> : <ChevronRightIcon size={18} />}
    </Button>
  );

  return (
    <Collapsible open={open} className={cn(className)}>
      <div className="flex justify-between items-center">
        {title}
        <CollapsibleTrigger asChild>{TriggerButton}</CollapsibleTrigger>
      </div>
      <CollapsibleContent className={cn(contentClassName)}>{children}</CollapsibleContent>
    </Collapsible>
  );
}
