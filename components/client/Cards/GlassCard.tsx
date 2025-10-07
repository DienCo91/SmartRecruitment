import {
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BaseProps } from '@/types';
import { ReactNode } from 'react';
import GlassCardBase from './GlassCardBase';

interface Props extends BaseProps {
  title?: string | ReactNode;
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
    <GlassCardBase className={className}>
      {title !== '' && (
        <CardHeader className="gap-0 p-0">
          <div className="flex justify-between">
            <CardTitle className="text-lg ml-0 ư-full">
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
      )}

      <CardContent className={cn('relative px-0', classContentName)}>{children}</CardContent>

      {footer && <CardFooter className="relative">{footer}</CardFooter>}
    </GlassCardBase>
  );
}
