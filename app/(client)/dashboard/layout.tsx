import { GlassCard } from '@/components/client/Cards/GlassCard';
import DashboardSidebar from '@/components/client/Dashboard/DashboardSidebar';
import React from 'react';

const LayoutDashboard = (prop: LayoutProps<'/dashboard'>) => {
  return (
    <div className="grid grid-cols-12 mt-[60px]">
      <div className="col-span-3">
        <DashboardSidebar />
      </div>
      <div className="col-span-9 ml-[16px]">
        <GlassCard className="pb-[32px] text-[18px]">{prop.children}</GlassCard>
      </div>
    </div>
  );
};

export default LayoutDashboard;
