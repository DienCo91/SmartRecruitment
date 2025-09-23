import { Label } from '@/components/ui/label';
import { TOptions } from '@/types';

type PropsCompanyOverViewItem = TOptions;

export function CompanyOverViewItem({ label, value }: PropsCompanyOverViewItem) {
  return (
    <div className="flex justify-between mb-4">
      <Label className="text-gray-300">{label}</Label>
      <Label>{value}</Label>
    </div>
  );
}
