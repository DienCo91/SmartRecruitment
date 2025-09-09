import { AppImage } from '@/common';
import Image from 'next/image';
import React from 'react';

import { Briefcase, Building2 } from 'lucide-react';

type StatItem = {
  icon: React.ReactNode;
  value: string;
  label: string;
};

const stats: StatItem[] = [
  {
    icon: <Briefcase className="w-8 h-8 text-white" />,
    value: '1,75,324',
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
        {props.children}
        <Image
          src={AppImage.backgroundLogo}
          alt="Background login"
          className="object-cover h-screen max-w-1/2 absolute top-0 bottom-0 right-0"
        />
        <div className="absolute bottom-[120px] pl-[60px] right-[60px] max-w-[calc(50%-100px)]">
          <h1 className="text-[28px] text-white font-[500] ">
            Over 1,75,324 candidates waiting for good employees.
          </h1>
          <div className="flex space-x-[40px] mt-[50px]">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center ">
                <div className="bg-slate-800/70 p-4 rounded-lg mb-3">{stat.icon}</div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
