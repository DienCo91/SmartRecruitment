import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva('text-foreground', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-4',
      h2: 'scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 mb-4',
      h3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
      h4: 'scroll-m-20 text-xl font-semibold tracking-tight',
      h5: 'text-lg font-medium',
      h6: 'text-base font-medium',
      p: 'text-base leading-relaxed mb-1',
      small: 'text-sm font-normal',
      muted: 'text-sm text-muted-foreground',
      xsmall: 'text-xs font-normal',
    },
  },
  defaultVariants: {
    variant: 'p',
  },
});

function Typography({
  className,
  variant,
  asChild = false,
  component = 'p',
  ...props
}: React.ComponentProps<'p'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    component?: string;
  }) {
  const Comp = asChild ? Slot : component;

  return (
    <Comp
      data-slot={component}
      className={cn(
        buttonVariants({
          variant,
          className,
        })
      )}
      {...props}
    />
  );
}

export { buttonVariants, Typography };
