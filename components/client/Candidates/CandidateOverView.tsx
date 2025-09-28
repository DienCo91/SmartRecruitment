import { format } from 'date-fns';
import { GlassCard } from '../Cards/GlassCard';
import { CandidateOverViewItems } from './CandidateOverViewItems';

export function CandidateOverView() {
  return (
    <GlassCard title="" classContentName="grid grid-cols-2 gap-3">
      <CandidateOverViewItems.BirthOfDate content={format(new Date('2003-08-07'), 'MMM, dd yyy')} />
      <CandidateOverViewItems.National content={'Việt Nam'} />
      <CandidateOverViewItems.MaritalStatus content={'Độc thân'} />
      <CandidateOverViewItems.Gender content={'Nam'} />
      <CandidateOverViewItems.Experience content={'1 Năm'} />
      <CandidateOverViewItems.Education content={'Đã tốt nghiệp đại học'} />
    </GlassCard>
  );
}
