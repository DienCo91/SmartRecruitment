import { PropsWithChildren } from 'react';
import { FavoriteProvider } from './FavoriteProvider';
import { TanstackQueryProvider } from './TanstackQueryProvider';

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <>
      <TanstackQueryProvider>
        <FavoriteProvider>{children}</FavoriteProvider>
      </TanstackQueryProvider>
    </>
  );
}
