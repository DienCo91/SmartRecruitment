import { format } from 'date-fns';
import { GlassCard } from '../Cards/GlassCard';
import { CandidateOverViewItems } from './CandidateOverViewItems';
import { ICandidateDetail } from '@/types';
import { vi } from 'date-fns/locale';
import {
  EducationLevel,
  educationLevel,
  ExperienceLevel,
  experienceLevel,
  Gender,
  gender,
} from '@/constants';

interface Props {
  candidateDetail: ICandidateDetail;
}

export function CandidateOverView({ candidateDetail }: Props) {
  return (
    <GlassCard title="" classContentName="grid grid-cols-2 gap-3">
      {candidateDetail.dateOfBirth && (
        <CandidateOverViewItems.BirthOfDate
          content={format(new Date(candidateDetail.dateOfBirth), 'dd/MM/yyyy', { locale: vi })}
        />
      )}
      {candidateDetail.nationality && (
        <CandidateOverViewItems.National content={candidateDetail.nationality} />
      )}
      {candidateDetail.maritalStatus && (
        <CandidateOverViewItems.MaritalStatus content={candidateDetail.maritalStatus} />
      )}
      {candidateDetail.gender && (
        <CandidateOverViewItems.Gender content={gender[candidateDetail.gender as Gender]} />
      )}
      {candidateDetail.experienceLevel && (
        <CandidateOverViewItems.Experience
          content={experienceLevel[candidateDetail.experienceLevel as ExperienceLevel]}
        />
      )}
      {candidateDetail.educationLevel && (
        <CandidateOverViewItems.Education
          content={educationLevel[candidateDetail.educationLevel as EducationLevel]}
        />
      )}
    </GlassCard>
  );
}
