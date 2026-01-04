import { Separator } from '@/components/ui/separator';
import { GlassCard } from '../Cards/GlassCard';
import { CandidateContactInformationItems } from './CandidateContactInformationItems';
import { ICandidateDetail } from '@/types';

interface Props {
  candidateDetail: ICandidateDetail;
}

export function CandidateContactInformation({ candidateDetail }: Props) {
  return (
    <GlassCard title={<p className="text-base">Thông tin liên hệ</p>} action>
      <div className="flex flex-col">
        {candidateDetail.personalWebsite && (
          <CandidateContactInformationItems.Website content={candidateDetail.personalWebsite} />
        )}
        <Separator className="my-2 bg-gray-500" />
        <CandidateContactInformationItems.Location
          content={`${candidateDetail.location.provinceCity}, ${candidateDetail.location.country}`}
        />
        <Separator className="my-2 bg-gray-500" />
        {candidateDetail.phone && (
          <CandidateContactInformationItems.Phone content={candidateDetail.phone} />
        )}
        <Separator className="my-2 bg-gray-500" />
        {candidateDetail.email && (
          <CandidateContactInformationItems.Email content={candidateDetail.email} />
        )}
      </div>
    </GlassCard>
  );
}
