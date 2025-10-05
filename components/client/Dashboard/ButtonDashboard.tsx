import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';

interface IButtonDashboard extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  className?: string;
}

const ButtonDashboard: React.FC<IButtonDashboard> = ({ title, className, ...props }) => {
  return (
    <Button
      variant="outline"
      className={cn(
        'text-blue-600 border-blue-200 hover:text-white hover:bg-blue-600 border-none cursor-pointer',
        className
      )}
      {...props}
    >
      {title}
    </Button>
  );
};

export default ButtonDashboard;
