import { ICandidateDetail } from '@/types';
import { DecorateContent as CandidateContent } from '../Jobs/DecorateContent';
import { CandidateContactInformation } from './CandidateContactInformation';
import { CandidateOverView } from './CandidateOverView';
import { DownloadCandidateResume } from './DownloadCandidateResume';

export function CandidateDetailContent({ candidateDetail }: { candidateDetail: ICandidateDetail }) {
  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-8">
        <CandidateContent
          title="Tiểu sử"
          content={candidateDetail?.biography || 'Chưa cập nhật tiểu sử'}
        />
      </div>
      <div className="col-span-4 space-y-5">
        <CandidateOverView candidateDetail={candidateDetail} />
        <DownloadCandidateResume candidateDetail={candidateDetail} />
        <CandidateContactInformation candidateDetail={candidateDetail} />
      </div>
    </div>
  );
}
