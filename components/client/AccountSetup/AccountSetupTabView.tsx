'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Router } from '@/constants';
import { useProgressAccountSetup } from '@/contexts';
import { setLoading } from '@/lib/features/common/commonSlice';
import { cn } from '@/lib/utils';
import { EmployerService } from '@/services/employer.services';
import { Location } from '@/types';
import { AtSign, Globe, User, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import CompanyInfo from './company-infor';
import Contact from './contact';
import FoundingContent from './founding-content';
import SocialMediaProfile from './social-media-profile';

export interface DataSubmitFormProps {
  nameCompany: string;
  description: string;
  logo: File | string;
  banner: File | string;
  organizationType: string;
  industryTypes: string;
  teamSize: string;
  yearOfEstablishment: number;
  companyWebsite: string;
  socialLinks: {
    platformName: string;
    url: string;
  }[];
  location: Location | null;
  phoneNumber: string;
  email: string;
  companyVision: string;
}

const tabs = [
  { value: 'company', label: 'Thông tin công ty', icon: User },
  { value: 'founding', label: 'Thông tin sáng lập', icon: Users },
  { value: 'social', label: 'Truyền thông & xã hội', icon: Globe },
  { value: 'contact', label: 'Liên hệ', icon: AtSign },
] as const;

interface IAccountSetupTabView {
  classNameTabList?: string;
  classNameTabTrigger?: string;
}

const initData = {
  nameCompany: '',
  description: '',
  logo: '',
  banner: '',
  organizationType: '',
  industryTypes: '',
  teamSize: '',
  yearOfEstablishment: new Date().getFullYear(),
  companyWebsite: '',
  socialLinks: [],
  location: null,
  phoneNumber: '',
  email: '',
  companyVision: '',
};

const AccountSetupTabView: React.FC<IAccountSetupTabView> = ({
  classNameTabList,
  classNameTabTrigger,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<string>(tabs[0].value);
  const { setProgress } = useProgressAccountSetup();
  const [dataSubmitForm, setDataSubmitForm] = useState<DataSubmitFormProps>(initData);
  const [hasInitData, setHasInitData] = useState(false);

  const currentIndex = tabs.findIndex(tab => tab.value === activeTab);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    dispatch(setLoading(true));
    try {
      const res = await EmployerService.getMyCompany();
      if (res.data) {
        setDataSubmitForm({
          nameCompany: res.data.name,
          description: res.data.description,
          logo: res.data.logoUrl,
          banner: res.data.bannerUrl,
          organizationType: res.data.organizationType,
          industryTypes: res.data.industryType,
          teamSize: res.data.teamSize,
          yearOfEstablishment: res.data.foundedIn,
          companyWebsite: res.data.website,
          socialLinks: res.data.socialLinks,
          location: res.data.location,
          phoneNumber: res.data.phone,
          email: res.data.email,
          companyVision: res.data.companyVision,
        });

        setHasInitData(true);
      }
    } catch (error) {
      console.log('error', error);
      // toast.error('You have not created a company yet');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSubmit = async (data: DataSubmitFormProps) => {
    try {
      dispatch(setLoading(true));
      await EmployerService.updateCompanyInfo(
        {
          name: data.nameCompany,
          description: data.description,
          email: data.email,
          industryType: data.industryTypes,
          location: data.location,
          organizationType: data.organizationType,
          phone: data.phoneNumber,
          teamSize: data.teamSize,
          website: data.companyWebsite,
          companyVision: data.companyVision,
          foundedIn: data.yearOfEstablishment,
          socialLinks: [...data.socialLinks],
        },
        data.logo as File,
        data.banner as File
      );
      router.push(Router.CONGRATULATIONS);
    } catch (error) {
      console.log('error', error);
      toast.error('Update social links failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const goToNext = (values?: Partial<DataSubmitFormProps>) => {
    if (values) {
      setDataSubmitForm(prev => ({ ...prev, ...values }));
    }

    if (currentIndex < tabs.length - 1) {
      const nextTab = tabs[currentIndex + 1].value;
      setActiveTab(nextTab);
      setProgress(((currentIndex + 1) * 100) / tabs.length);
      window.scrollTo(0, 0);
    } else {
      handleSubmit({ ...dataSubmitForm, ...values });
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

  const handleActiveUpdate = async () => {
    if (typeof dataSubmitForm.logo === 'string') {
      setDataSubmitForm(prev => ({
        ...prev,
        logo: '',
        banner: '',
      }));
    }

    setHasInitData(false);
  };

  return (
    <div className="mt-[10px]">
      {hasInitData && (
        <Button className="mb-[20px]" onClick={handleActiveUpdate}>
          Chỉnh sửa
        </Button>
      )}
      <Tabs
        defaultValue="company"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full "
      >
        <TabsList
          className={cn(
            'flex justify-start w-full border-b border-gray-200 bg-transparent p-0 rounded-none px-[0px] lg:px-[200px] ',
            classNameTabList
          )}
        >
          {tabs.map(tab => (
            <TabsTrigger
              disabled={!hasInitData}
              key={tab.value}
              value={tab.value}
              style={{ boxShadow: 'none' }}
              className={cn(
                `flex border-0 mb-[-3px]  rounded-none items-center gap-2  py-3 text-sm font-medium border-b-2
             border-transparent data-[state=active]:border-blue-500 data-[state=active]:text-blue-600 text-gray-500
            hover:text-gray-600 focus:outline-none transition-colors disabled:opacity-100 disabled:cursor-default `,
                classNameTabTrigger
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent forceMount value="company" className="data-[state=inactive]:hidden">
          <CompanyInfo goToNext={goToNext} initValue={dataSubmitForm} hasInitData={hasInitData} />
        </TabsContent>
        <TabsContent forceMount value="founding" className="data-[state=inactive]:hidden">
          <FoundingContent
            goToNext={goToNext}
            goToPrev={goToPrev}
            initValue={dataSubmitForm}
            hasInitData={hasInitData}
          />
        </TabsContent>
        <TabsContent forceMount value="social" className="data-[state=inactive]:hidden">
          <SocialMediaProfile
            goToNext={goToNext}
            goToPrev={goToPrev}
            initValue={dataSubmitForm}
            hasInitData={hasInitData}
          />
        </TabsContent>
        <TabsContent forceMount value="contact" className="data-[state=inactive]:hidden">
          <Contact
            goToNext={goToNext}
            goToPrev={goToPrev}
            initValue={dataSubmitForm}
            hasInitData={hasInitData}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccountSetupTabView;
