import { GlassCard } from '@/components/client/Cards/GlassCard';
import { JobCardMini } from '@/components/client/Jobs/JobCardMini';

const CompanyDetailPosition = () => {
  return (
    <>
      <div id="open-position"></div>
      <GlassCard
        className=" mt-10"
        title={<h1 className="mb-[8px] text-[20px] font-bold">Open Position</h1>}
        action
      >
        <div className=" grid grid-cols-2 lg:grid-cols-3 gap-[16px]">
          {Array.from({ length: 10 }, (_, i) => (
            <JobCardMini key={i} />
          ))}
        </div>
      </GlassCard>
    </>
  );
};

export default CompanyDetailPosition;
