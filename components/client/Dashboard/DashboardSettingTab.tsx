'use client';
import { TabsContent } from '@/components/ui/tabs';
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { CircleUser, Globe, Settings, User } from 'lucide-react';
import React, { useState } from 'react';
import DashboardSettingPersonal from './DashboardSettingPersonal';
import DashboardProfile from './DashboardProfile';
import DashboardSocialLink from './DashboardSocialLink';
import DashboardAccountSetting from './DashboardAccountSetting';
import { Separator } from '@/components/ui/separator';
import DashboardChangePassword from './DashboardChangePassword';
import { isLoginWithOAuth2 } from '@/utils';

const tabs = [
  { value: 'personal', label: 'Personal', icon: User },
  { value: 'profile', label: 'Profile', icon: CircleUser },
  { value: 'social', label: 'Social Links', icon: Globe },
  { value: 'account-setting', label: 'Account Setting', icon: Settings },
];

const DashboardSettingTabView = () => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].value);
  const canChangePassword = !isLoginWithOAuth2();

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
        <DashboardSettingPersonal />
      </TabsContent>
      <TabsContent forceMount value="profile" className="data-[state=inactive]:hidden">
        <DashboardProfile />
      </TabsContent>
      <TabsContent forceMount value="social" className="data-[state=inactive]:hidden">
        <DashboardSocialLink />
      </TabsContent>
      <TabsContent forceMount value="account-setting" className="data-[state=inactive]:hidden">
        <DashboardAccountSetting />
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
