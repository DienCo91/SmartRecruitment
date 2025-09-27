import { GlassCard } from '@/components/client/Cards/GlassCard';
import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const FOLLOW_SOCIAL = [
  {
    href: '',
    icon: <FaFacebookF size={24} color="#3b5998" />,
  },
  {
    href: '',
    icon: <FaXTwitter size={24} color="black" />,
  },
  {
    href: '',
    icon: <FaInstagram size={24} color="#d62976" />,
  },
  {
    href: '',
    icon: <FaYoutube size={24} color="red" />,
  },
];

const CompanyDetailFollow = () => {
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
