import { BriefcaseBusinessIcon } from 'lucide-react';
import { CiCalendar } from 'react-icons/ci';
import { FaUsers } from 'react-icons/fa';
import { FaRegClock } from 'react-icons/fa6';
import { GlassCard } from '../Cards/GlassCard';

const OVERVIEW_COMPANY = [
  {
    label: 'Founded in',
    value: '14 June, 2021',
    icon: <CiCalendar size={22} />,
  },
  {
    label: 'Organization type',
    value: 'Private Company',
    icon: <FaRegClock size={22} />,
  },
  {
    label: 'Team size',
    value: '120-300 Candidates',
    icon: <FaUsers size={22} />,
  },
  {
    label: 'Industry types',
    value: 'Technology',
    icon: <BriefcaseBusinessIcon size={22} />,
  },
];

const CompanyDetailOverview = () => {
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
            <span className="mt-1 text-[12px] font-[500]">{item.value}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default CompanyDetailOverview;
