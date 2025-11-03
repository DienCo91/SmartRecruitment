import { organizationType } from '@/constants';
import { CompanyInfo } from '@/types';
import { format } from 'date-fns';
import { GlassCard } from '../Cards/GlassCard';
import { CompanyOverViewHeader } from './CompanyOverViewHeader';
import { CompanyOverViewItem } from './CompanyOverViewItem';
import { getLabelOrganization, getLabelTeamSize } from '@/utils';

interface Props {
  company: CompanyInfo;
}

export function CompanyOverView({ company }: Props) {
  return (
    <GlassCard title={<CompanyOverViewHeader company={company} />} action>
      <CompanyOverViewItem label="Founded in" value={format(company.foundedIn, 'MMMM dd, yyy')} />
      <CompanyOverViewItem label="Organization type" value={'Organization type'} />
      <CompanyOverViewItem
        label="Company size"
        value={getLabelTeamSize(company.companySize) + ' employees'}
      />
      <CompanyOverViewItem label="Phone" value={company.phone} />
      <CompanyOverViewItem label="Email" value={company.email} />
      <CompanyOverViewItem label="Website" value={company.website} />
    </GlassCard>
  );
}
