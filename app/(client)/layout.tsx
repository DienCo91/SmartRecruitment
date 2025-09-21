import { LoadingDoubleCircle } from '@/components/Loadings/LoadingDoubleCircle';
import { NavBar } from '@/components/client/NavBar/NavBar';
import { Suspense } from 'react';

const ClientLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-screen h-screen overflow-hidden relative theme-default">
      <div className="flex flex-col h-full">
        <Suspense fallback={<LoadingDoubleCircle />}>
          <NavBar />
          <div className="flex-1 overflow-y-auto">
            <div className="w-full max-w-7xl mx-auto">{children}</div>
          </div>
        </Suspense>
      </div>
    </div>
  );
};

export default ClientLayout;
