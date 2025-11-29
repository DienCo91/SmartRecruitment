export * from './osm';
export * from './company';
export * from './job';
export * from './auth';
export * from './candidate';
export * from './employer';
export * from './chat';

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
