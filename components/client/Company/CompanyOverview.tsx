import { Company } from '@/types';
import { GlassCard } from '../Cards/GlassCard';
import { format } from 'date-fns';
import { CompanyOverViewItem } from './CompanyOverViewItem';
import { organizationType } from '@/constants';
import { CompanyOverViewHeader } from './CompanyOverViewHeader';

interface Props {
  company: Company;
}

export function CompanyOverView({ company }: Props) {
  return (
    <GlassCard title={<CompanyOverViewHeader {...company} />} action>
      <CompanyOverViewItem label="Founded in" value={format(company.founded_in, 'MMMM dd, yyy')} />
      <CompanyOverViewItem
        label="Organization type"
        value={organizationType[company.organization_type]}
      />
      <CompanyOverViewItem label="Company size" value={company.team_size + ' employees'} />
      <CompanyOverViewItem label="Phone" value={company.phone} />
      <CompanyOverViewItem label="Email" value={company.email} />
      <CompanyOverViewItem label="Website" value={company.website} />
    </GlassCard>
  );
}
