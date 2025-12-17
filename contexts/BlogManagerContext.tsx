import { ISpecificationBlogManageParams } from '@/types/blog';
import { createContext, useContext } from 'react';

export interface BlogManagerContextProps {
  filter: ISpecificationBlogManageParams;
  setFilter: (filter: ISpecificationBlogManageParams) => void;
}

export const BlogManagerContext = createContext<BlogManagerContextProps | null>(null);

export function useBlogManager() {
  const context = useContext(BlogManagerContext);

  if (!context) {
    throw new Error('useBlogManager must be used within BlogManagerProvider');
  }

  return context;
}
