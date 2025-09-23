import { BaseProps } from '@/types';
import { ReactNode } from 'react';
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Props extends BaseProps {
  title: string | ReactNode;
  children: ReactNode;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
  footer?: ReactNode;
  classContentName?: string;
}

export function GlassCard({
  title,
  icon,
  description = '',
  action,
  footer,
  children,
  className,
  classContentName,
}: Props) {
  return (
    <Card
      className={cn(
        'bg-white/5 border-none group text-neutral-300 relative overflow-visible\
        rounded-xl p-4 backdrop-blur-md transition-all duration-300\
        hover:bg-white/10 hover:shadow-lg hover:shadow-white/5 hover:translate-y-[-5px]',
        className
      )}
    >
      <CardHeader className="gap-0">
        <div className="flex justify-between">
          <CardTitle className="text-lg ml-0">
            {icon && <span className="mr-2">{icon}</span>}
            {title}
          </CardTitle>

          {action ? (
            <CardAction>{action}</CardAction>
          ) : (
            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-20" />
          )}
        </div>
        <CardDescription className="text-gray-400">{description}</CardDescription>
      </CardHeader>

      <CardContent className={cn('relative', classContentName)}>{children}</CardContent>

      {footer && <CardFooter className="relative">{footer}</CardFooter>}
    </Card>
  );
}
