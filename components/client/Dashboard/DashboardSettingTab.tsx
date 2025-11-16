'use client';
import { Separator } from '@/components/ui/separator';
import { TabsContent } from '@/components/ui/tabs';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { CandidateService } from '@/services/candidate.services';
import { ICandidateDetail } from '@/types';
import { isLoginWithOAuth2 } from '@/utils';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { CircleUser, Globe, Settings, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import DashboardAccountSetting from './DashboardAccountSetting';
import DashboardChangePassword from './DashboardChangePassword';
import DashboardProfile from './DashboardProfile';
import DashboardSettingPersonal from './DashboardSettingPersonal';
import DashboardSocialLink from './DashboardSocialLink';
import { setLoading } from '@/lib/features/common/commonSlice';

const tabs = [
  { value: 'personal', label: 'Cá nhân', icon: User },
  { value: 'profile', label: 'Profile', icon: CircleUser },
  { value: 'social', label: 'Liên kết', icon: Globe },
  { value: 'account-setting', label: 'Cài đặt tài khoản', icon: Settings },
];

const DashboardSettingTabView = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.common.isLoading);
  const [activeTab, setActiveTab] = useState<string>(tabs[0].value);
  const canChangePassword = !isLoginWithOAuth2();
  const [data, setData] = useState<ICandidateDetail | null>(null);

  const getMyProfile = async () => {
    try {
      dispatch(setLoading(true));
      const res = await CandidateService.getMyProfile();
      setData(res.data);
    } catch (error) {
      console.log('e', error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getMyProfile();
  }, []);

  if (isLoading) return;

  return (
    <Tabs
      defaultValue="company"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full mt-[32px]"
    >
      <TabsList className="flex justify-start w-full border-b border-[#ffffff73] bg-transparent p-0 rounded-none px-[0px] ">
        {tabs.map(tab => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            style={{ boxShadow: 'none' }}
            className="flex border-0 mb-[-1px]  rounded-none items-center gap-2  py-3 text-sm font-medium border-b-2  text-[#ffffff5d] px-[32px]
             border-transparent data-[state=active]:border-white  data-[state=active]:text-white
            hover:text-[#ffffffaa] focus:outline-none transition-colors disabled:opacity-100 disabled:cursor-default"
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent forceMount value="personal" className="data-[state=inactive]:hidden">
        <DashboardSettingPersonal data={data} />
      </TabsContent>
      <TabsContent forceMount value="profile" className="data-[state=inactive]:hidden">
        <DashboardProfile data={data} />
      </TabsContent>
      <TabsContent forceMount value="social" className="data-[state=inactive]:hidden">
        <DashboardSocialLink data={data} />
      </TabsContent>
      <TabsContent forceMount value="account-setting" className="data-[state=inactive]:hidden">
        <DashboardAccountSetting data={data} />
        {canChangePassword && (
          <>
            <Separator className="my-8 bg-gray-500" />
            <DashboardChangePassword />
          </>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default DashboardSettingTabView;
