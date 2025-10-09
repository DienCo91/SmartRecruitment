import GlassCardBase from '../Cards/GlassCardBase';
import ApplicationItem from './ApplicationItem';

interface IApplicationList {
  title: string;
}
export const ApplicationList: React.FC<IApplicationList> = ({ title }) => {
  return (
    <GlassCardBase className="mt-[32px] w-full">
      <div className="w-full">
        <h1 className="font-bold text-[16px] mb-[20px]">{title}</h1>
        <div className="grid grid-cols-1 gap-4 w-full max-h-screen overflow-auto py-[10px]">
          {Array.from({ length: 5 }, (_, i) => {
            return <ApplicationItem key={i} />;
          })}
        </div>
      </div>
    </GlassCardBase>
  );
};
