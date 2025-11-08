import { BriefcaseBusinessIcon } from 'lucide-react';
import { CustomImage } from '../Images/CustomImage';
import Link from 'next/link';
import { TopCompany } from '@/types';

interface Props {
  company: TopCompany;
}

export function CompanyCard({ company }: Props) {
  return (
    <div className="flex flex-col bg-white/5 p-3 rounded-xl shadow-sm hover:bg-white/15 hover:shadow-lg">
      <div className="flex mt-3 gap-3 ">
        <CustomImage src={company.logoUrl} alt={company.name} />

        <div className="flex-1 flex flex-col justify-between w-full">
          <div>
            <Link
              href={`/company/${company.id}`}
              className="font-semibold text-neutral-300 hover:text-blue-400 line-clamp-2 hover:cursor-pointer"
            >
              {company.name}
            </Link>
            <p className="text-gray-400 text-sm line-clamp-2">{company.industryType}</p>
          </div>
        </div>
      </div>
      <p className="flex items-center mt-2 gap-1 text-xs text-neutral-300">
        <BriefcaseBusinessIcon size={14} />
        <span className="font-semibold">{company.numberOfJobs} việc làm</span>
      </p>
    </div>
  );
}
