'use client';
import AccountSetup from '@/app/(account-setup)/account-setup/page';
import DashboardHeader from '@/components/client/Dashboard/DashboardHeader';
import DashboardSettingTabView from '@/components/client/Dashboard/DashboardSettingTab';
import { useAppSelector } from '@/lib/hooks';
import { RootState } from '@/lib/store';

const Setting = () => {
  const currentUser = useAppSelector((state: RootState) => state.auth.currentUser);

  // if (!currentUser) return null;

  // const isCandiDate = isEmployer(currentUser.role)
  const isCandiDate = false;

  return (
    <>
      <DashboardHeader title="Setting" />
      {isCandiDate ? (
        <DashboardSettingTabView />
      ) : (
        <AccountSetup
          classNameTabList="lg:px-[0px] bg-transparent "
          classNameTabTrigger="data-[state=active]:bg-transparent data-[state=active]:border-white data-[state=active]:text-white border-gray-500"
        />
      )}
    </>
  );
};

export default Setting;
