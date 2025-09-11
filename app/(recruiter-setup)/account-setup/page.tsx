'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Users, Globe, AtSign } from 'lucide-react';
import CompanyInfo from '../components/company-infor';
import { useProgressAccountSetup } from '@/contexts';
import FoundingContent from '../components/founding-content';
import SocialMediaProfile from '../components/social-media-profile';
import Contact from '../components/contact';

const AccountSetup = () => {
  const [activeTab, setActiveTab] = useState('company');
  const { setProgress } = useProgressAccountSetup();

  const tabs = [
    { value: 'company', label: 'Company Info', icon: User },
    { value: 'founding', label: 'Founding Info', icon: Users },
    { value: 'social', label: 'Social Media Profile', icon: Globe },
    { value: 'contact', label: 'Contact', icon: AtSign },
  ] as const;

  const currentIndex = tabs.findIndex(tab => tab.value === activeTab);

  const goToNext = () => {
    if (currentIndex < tabs.length - 1) {
      const nextTab = tabs[currentIndex + 1].value;
      setActiveTab(nextTab);
      setProgress(((currentIndex + 1) * 100) / tabs.length);
      window.scrollTo(0, 0);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      const prevTab = tabs[currentIndex - 1].value;
      setActiveTab(prevTab);
      setProgress(((currentIndex - 1) * 100) / tabs.length);
      window.scrollTo(0, 0);
    }
  };
  return (
    <Tabs
      defaultValue="company"
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full mt-[60px]"
    >
      <TabsList className="flex justify-start w-full border-b border-gray-200 bg-transparent p-0 rounded-none px-[0px] lg:px-[200px]">
        {[
          { value: 'company', label: 'Company Info', icon: User },
          { value: 'founding', label: 'Founding Info', icon: Users },
          { value: 'social', label: 'Social Media Profile', icon: Globe },
          { value: 'contact', label: 'Contact', icon: AtSign },
        ].map((tab, idx) => (
          <TabsTrigger
            onClick={() => setProgress((idx * 100) / 4)}
            key={tab.value}
            value={tab.value}
            style={{ boxShadow: 'none' }}
            className="flex border-0 mb-[-3px] rounded-none items-center gap-2  py-3 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 text-gray-500 hover:text-gray-700 focus:outline-none transition-colors"
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="company">
        <CompanyInfo goToNext={goToNext} />
      </TabsContent>
      <TabsContent value="founding">
        <FoundingContent goToNext={goToNext} goToPrev={goToPrev} />
      </TabsContent>
      <TabsContent value="social">
        <SocialMediaProfile goToNext={goToNext} goToPrev={goToPrev} />
      </TabsContent>
      <TabsContent value="contact">
        <Contact goToPrev={goToPrev} />
      </TabsContent>
    </Tabs>
  );
};

export default AccountSetup;
