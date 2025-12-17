import { ApiResponse } from '@/services/admin.services';

export * from './auth';
export * from './candidate';
export * from './chat';
export * from './company';
export * from './employer';
export * from './job';
export * from './osm';

export interface BaseProps {
  className?: string;
}

export interface TOptions {
  value: string;
  label: string;
}

export interface Pagination {
  page?: number;
  limit?: number;
  totalElements?: number;
  totalPages?: number;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export interface TagData {
  id: number;
  name: string;
}

export interface ApiPaginationResponse<T> extends ApiResponse<T> {
  meta: Pagination;
}
