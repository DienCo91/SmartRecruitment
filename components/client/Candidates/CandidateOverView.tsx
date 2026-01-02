import { format } from 'date-fns';
import { GlassCard } from '../Cards/GlassCard';
import { CandidateOverViewItems } from './CandidateOverViewItems';
import { ICandidateDetail } from '@/types';

interface Props {
  candidateDetail: ICandidateDetail | null;
}

export function CandidateOverView({ candidateDetail }: Props) {
  if (!candidateDetail) return;

  return (
    <GlassCard title="" classContentName="grid grid-cols-2 gap-3">
      {candidateDetail.dateOfBirth && (
        <CandidateOverViewItems.BirthOfDate
          content={format(new Date(candidateDetail.dateOfBirth), 'MMM, dd yyy')}
        />
      )}
      {candidateDetail.nationality && (
        <CandidateOverViewItems.National content={candidateDetail.nationality} />
      )}
      {candidateDetail.maritalStatus && (
        <CandidateOverViewItems.MaritalStatus content={candidateDetail.maritalStatus} />
      )}
      {candidateDetail.gender && <CandidateOverViewItems.Gender content={candidateDetail.gender} />}
      {candidateDetail.experienceLevel && (
        <CandidateOverViewItems.Experience content={candidateDetail.experienceLevel} />
      )}
      {candidateDetail.educationLevel && (
        <CandidateOverViewItems.Education content={candidateDetail.educationLevel} />
      )}
    </GlassCard>
  );
}
