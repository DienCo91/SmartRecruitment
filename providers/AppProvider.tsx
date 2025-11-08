import { PropsWithChildren } from 'react';
import { FavoriteProvider } from './FavoriteProvider';

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <>
      <FavoriteProvider>{children}</FavoriteProvider>
    </>
  );
}
