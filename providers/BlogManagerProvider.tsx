'use client';
import { BlogManagerContext, BlogManagerContextProps } from '@/contexts';
import { ISpecificationBlogManageParams } from '@/types/blog';
import { PropsWithChildren, useMemo, useState } from 'react';

export function BlogManagerProvider({ children }: PropsWithChildren) {
  const [filter, setFilter] = useState<ISpecificationBlogManageParams>({ page: 1, limit: 10 });

  const value = useMemo<BlogManagerContextProps>(
    () => ({ filter, setFilter }),
    [filter, setFilter]
  );

  return <BlogManagerContext.Provider value={value}>{children}</BlogManagerContext.Provider>;
}
