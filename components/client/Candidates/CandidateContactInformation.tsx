import { Separator } from '@/components/ui/separator';
import { GlassCard } from '../Cards/GlassCard';
import { CandidateContactInformationItems } from './CandidateContactInformationItems';

export function CandidateContactInformation() {
  return (
    <GlassCard title={<p className="text-base">Thông tin liên hệ</p>} action>
      <div className="flex flex-col">
        <CandidateContactInformationItems.Website content="http://localhost:3000" />
        <Separator className="my-2 bg-gray-500" />
        <CandidateContactInformationItems.Location content="Số 10 Nguyễn Trãi, Hà Đông, Hà Nội" />
        <Separator className="my-2 bg-gray-500" />
        <CandidateContactInformationItems.Phone content="0345678910" />
        <Separator className="my-2 bg-gray-500" />
        <CandidateContactInformationItems.Email content="minhkhuong782k3@gmail.com" />
      </div>
    </GlassCard>
  );
}
