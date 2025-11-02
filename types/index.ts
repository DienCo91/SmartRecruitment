export * from './osm';
export * from './company';
export * from './job';
export * from './auth';
export * from './candidate';
export * from './employer';

export interface BaseProps {
  className?: string;
}

export interface TOptions {
  value: string;
  label: string;
}
