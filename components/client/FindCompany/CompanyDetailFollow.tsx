import { GlassCard } from '@/components/client/Cards/GlassCard';
import { CompanyDetail } from '@/types';
import { getIconSocialLink } from '@/utils/common';
import Link from 'next/link';
import React from 'react';

interface ICompanyDetailFollow {
  company: CompanyDetail;
}

const CompanyDetailFollow: React.FC<ICompanyDetailFollow> = ({ company }) => {
  const FOLLOW_SOCIAL = company.socialLinks.map(item => {
    return {
      href: item.url,
      icon: getIconSocialLink(item.platformName),
    };
  });

  return (
    <GlassCard title="Theo dõi chúng tôi" action>
      <div className="flex gap-6">
        {FOLLOW_SOCIAL.map((item, index) => (
          <React.Fragment key={index}>
            <Link href={item.href} target="_blank" className="p-[10px] bg-white rounded-md">
              {item.icon}
            </Link>
          </React.Fragment>
        ))}
      </div>
    </GlassCard>
  );
};

export default CompanyDetailFollow;
