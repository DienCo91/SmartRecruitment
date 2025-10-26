import { BriefcaseBusinessIcon } from 'lucide-react';
import { CiCalendar } from 'react-icons/ci';
import { FaUsers } from 'react-icons/fa';
import { FaRegClock } from 'react-icons/fa6';
import { GlassCard } from '../Cards/GlassCard';
import { CompanyDetail } from '@/types';
import { getLabelIndustry, getLabelOrganization, getLabelTeamSize } from '@/utils';

interface ICompanyDetailOverview {
  company: CompanyDetail;
}

const CompanyDetailOverview: React.FC<ICompanyDetailOverview> = ({ company }) => {
  const OVERVIEW_COMPANY = [
    {
      label: 'Founded in',
      value: company?.foundedIn || null,
      icon: <CiCalendar size={22} />,
    },
    {
      label: 'Organization type',
      value: getLabelOrganization(company.organizationType),
      icon: <FaRegClock size={22} />,
    },
    {
      label: 'Team size',
      value: getLabelTeamSize(company.teamSize),
      icon: <FaUsers size={22} />,
    },
    {
      label: 'Industry types',
      value: getLabelIndustry(company.industryType),
      icon: <BriefcaseBusinessIcon size={22} />,
    },
  ];

  return (
    <GlassCard title="Job Overview" action>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] ">
        {OVERVIEW_COMPANY.map(item => (
          <div key={item.label} className="flex flex-col items-center">
            <div className="w-[48px] h-[48px] flex justify-center items-center rounded-md ">
              {item.icon}
            </div>
            <span className="mt-2 text-[12px] font-[400] opacity-80">
              {item.label.toUpperCase()}
            </span>
            <span className="mt-1 text-[12px] font-[500] text-center">{item.value}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default CompanyDetailOverview;
