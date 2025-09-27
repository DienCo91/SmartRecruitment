import React from 'react';
import { GlassCard } from '@/components/client/Cards/GlassCard';
import { Separator } from '@/components/ui/separator';
import { FiPhone } from 'react-icons/fi';
import { GoMail } from 'react-icons/go';
import { RiGlobalLine } from 'react-icons/ri';

const CONTACT_INFO = [
  {
    label: 'Website',
    value: 'www.estherhoward.com',
    icon: <RiGlobalLine size={24} />,
  },
  {
    label: 'Phone',
    value: '+1-202-555-0141',
    icon: <FiPhone size={24} />,
  },

  {
    label: 'Email address',
    value: 'esther.howard@gmail.com',
    icon: <GoMail size={24} />,
  },
];

const CompanyDetailContact = () => {
  return (
    <GlassCard title="Thông tin liên hệ" action>
      {CONTACT_INFO.map((item, index) => (
        <React.Fragment key={item.label}>
          <div className="flex mt-2 items-center ">
            <div>{item.icon}</div>
            <div className="flex flex-col ml-[16px]">
              <span className="text-[12px] font-[400] opacity-80">{item.label}</span>
              <span className="mt-1 text-[16px] font-[500]">{item.value}</span>
            </div>
          </div>
          {index < CONTACT_INFO.length - 1 && (
            <Separator className="bg-white w-full h-[1px] my-[20px]" />
          )}
        </React.Fragment>
      ))}
    </GlassCard>
  );
};

export default CompanyDetailContact;
