import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import React from 'react';

interface IGlassCardBase extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: React.ReactNode;
}
const GlassCardBase: React.FC<IGlassCardBase> = ({ className, children, ...rest }) => {
  return (
    <Card
      {...rest}
      className={cn(
        'bg-white/5 border-none group text-neutral-300 relative overflow-visible\
        rounded-xl p-4 backdrop-blur-lg transition-all duration-300\
        hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 hover:translate-y-[-5px]',
        className
      )}
    >
      {children}
    </Card>
  );
};

export default GlassCardBase;
