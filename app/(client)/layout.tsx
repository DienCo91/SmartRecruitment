import { LoadingDoubleCircle } from '@/components/Loadings/LoadingDoubleCircle';
import { NavBar } from '@/components/client/NavBar/NavBar';
import Footer from '@/layout/footer';
import { Suspense } from 'react';

const ClientLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="w-screen overflow-hidden relative theme-default">
      <div className="flex flex-col h-full">
        <Suspense fallback={<LoadingDoubleCircle />}>
          <NavBar />
          <div className="flex-1 overflow-y-auto overflow-x-hidden h-screen">
            <div className="w-full max-w-7xl mx-auto text-neutral-300">{children}</div>
          </div>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
};

export default ClientLayout;
