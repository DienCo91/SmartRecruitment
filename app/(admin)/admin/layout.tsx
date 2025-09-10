import { AppSidebar } from '@/components/admin/AppSidebar/AppSidebar';
import { LoadingDot } from '@/components/admin/Loading/LoadingDot';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Size } from '@/constants';
import { Suspense } from 'react';

const AdminLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="relative">
      <Suspense fallback={<LoadingDot isFullscreen size={Size.LG} />}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <div>
              <SidebarTrigger variant={'secondary'} />
              {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </Suspense>
    </div>
  );
};

export default AdminLayout;
