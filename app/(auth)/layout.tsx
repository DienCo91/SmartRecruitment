import { AppImage } from '@/common';
import LogoApp from '@/components/ui/logo-app';
import { Router } from '@/constants';
import { Briefcase, Building2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type StatItem = {
  icon: React.ReactNode;
  value: string;
  label: string;
};

const stats: StatItem[] = [
  {
    icon: <Briefcase className="w-8 h-8 text-white" />,
    value: '175,324',
    label: 'Live Job',
  },
  {
    icon: <Building2 className="w-8 h-8 text-white" />,
    value: '97,354',
    label: 'Companies',
  },
  {
    icon: <Briefcase className="w-8 h-8 text-white" />,
    value: '7,532',
    label: 'New Jobs',
  },
];

const AuthLayout = async (props: LayoutProps<'/'>) => {
  return (
    <div className="min-h-screen relative flex justify-center">
      <div className="w-[80%]">
        <div className="relative w-full h-screen space-y-6 flex justify-center xl:justify-start items-center">
          <Link href={Router.HOME}>
            <LogoApp className="absolute left-0 top-[16px] flex items-center" />
          </Link>
          <div className="w-[300px] md:w-[400px] relative">{props.children}</div>
        </div>
        <div className="hidden xl:block">
          <Image
            src={AppImage.backgroundLogo}
            alt="Background login"
            className="object-fill h-screen max-w-[700px] 2xl:max-w-1/2 absolute top-0 bottom-0 right-0"
          />
          <div className="absolute bottom-1/2 translate-y-1/2 pl-[60px] right-[60px] max-w-[calc(50%-100px)]">
            <h1 className="text-[28px] text-white font-[500] ">
              Over 175,324 candidates waiting for good employees.
            </h1>
            <div className="flex justify-center space-x-[80px] mt-[50px]">
              {stats.map(stat => (
                <div key={stat.value} className="flex flex-col items-center justify-center ">
                  <div className="bg-slate-800/70 p-4 rounded-lg mb-3">{stat.icon}</div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
