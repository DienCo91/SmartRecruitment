'use client';
import AccountSetupTabView from '@/components/client/AccountSetup/AccountSetupTabView';
import DashboardHeader from '@/components/client/Dashboard/DashboardHeader';
import DashboardSettingTabView from '@/components/client/Dashboard/DashboardSettingTab';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';
import { isEmployer } from '@/utils';

const Setting = () => {
  const currentUser = useAppSelector((state: RootState) => state.auth.currentUser);

  if (!currentUser) return null;

  const isRoleEmployer = isEmployer(currentUser.role);
  console.log('🚀 ~ Setting ~ isCandiDate:', isRoleEmployer, currentUser.role);
  // const isCandiDate = false;

  return (
    <>
      <DashboardHeader title="Setting" />
      {!isRoleEmployer ? (
        <DashboardSettingTabView />
      ) : (
        <AccountSetupTabView
          classNameTabList="lg:px-[0px] bg-transparent "
          classNameTabTrigger="data-[state=active]:bg-transparent data-[state=active]:border-white data-[state=active]:text-white border-gray-500"
        />
      )}
    </>
  );
};

export default Setting;
