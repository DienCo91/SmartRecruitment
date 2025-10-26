import React, { SetStateAction, useEffect, useState } from 'react';
import { GlassDialog } from '../Dialogs/GlassDialog';
import { CandidateDetailContent } from './CandidateDetailContent';
import { CandidateDetailHeader } from './CandidateDetailHeader';
import { CandidateService } from '@/services/candidate.services';
import { ICandidateDetail } from '@/types/candidate';
import { LoadingCircle } from '@/components/Loadings/LoadingCircle';
interface ICandidateDetailModal {
  setShowDetailUserModel: (value: SetStateAction<boolean>) => void;
  candidateId: number;
}

const CandidateDetailModal: React.FC<ICandidateDetailModal> = ({
  setShowDetailUserModel,
  candidateId,
}) => {
  const [candidateDetail, setCandidateDetail] = useState<ICandidateDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getDetailCandidate = async () => {
    try {
      setLoading(true);
      const res = await CandidateService.getCandidateDetail(candidateId);
      setCandidateDetail(res.data || null);
    } catch (e) {
      console.error('Error fetching candidate detail:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetailCandidate();
  }, [candidateId]);

  return (
    <GlassDialog
      size="xl"
      open
      onClose={() => setShowDetailUserModel(false)}
      title={<CandidateDetailHeader candidateDetail={candidateDetail} />}
    >
      <div className="w-full min-h-[400px]">
        {loading ? (
          <LoadingCircle className="min-h-[400px]" />
        ) : candidateDetail ? (
          <CandidateDetailContent candidateDetail={candidateDetail} />
        ) : (
          <div className="p-6 text-center text-gray-400">Không tìm thấy thông tin ứng viên</div>
        )}
      </div>
    </GlassDialog>
  );
};

export default CandidateDetailModal;
