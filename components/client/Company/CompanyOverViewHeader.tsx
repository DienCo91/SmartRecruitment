import { Label } from '@/components/ui/label';
import { CompanyInfo } from '@/types';
import { CustomImage } from '../Images/CustomImage';

export function CompanyOverViewHeader({ company }: { company: CompanyInfo }) {
  return (
    <div className="flex gap-3">
      <CustomImage src={company.logoUrl} alt="" className="size-16" />
      <div className="text-sm space-y-1">
        <a href="" className="hover:text-blue-300">
          {company.name}
        </a>
        <Label>{company.website}</Label>
      </div>
    </div>
  );
}
