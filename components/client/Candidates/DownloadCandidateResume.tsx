import { DownloadIcon, FileUserIcon } from 'lucide-react';
import { GlassCard } from '../Cards/GlassCard';
import { Button } from '@/components/ui/button';
import { ICandidateDetail } from '@/types';

interface Props {
  candidateDetail: ICandidateDetail;
}

export function DownloadCandidateResume({ candidateDetail }: Props) {
  return (
    <GlassCard title={<p className="text-base">Tải CV ứng viên</p>} action>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <FileUserIcon size={50} />
          <div className="flex flex-col text-sm">
            <p id="full-name">{candidateDetail?.fullName || candidateDetail?.email}</p>
            <span id="mimetype">PDF</span>
          </div>
        </div>
        <Button className="bg-blue-200 text-blue-600 hover:bg-blue-300">
          <DownloadIcon size={16} />
        </Button>
      </div>
    </GlassCard>
  );
}
