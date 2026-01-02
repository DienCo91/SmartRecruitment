import { ICandidateDetail } from '@/types';
import { DecorateContent as CandidateContent } from '../Jobs/DecorateContent';
import { CandidateContactInformation } from './CandidateContactInformation';
import { CandidateOverView } from './CandidateOverView';
import { DownloadCandidateResume } from './DownloadCandidateResume';

export function CandidateDetailContent({
  candidateDetail,
}: {
  candidateDetail: ICandidateDetail | null;
}) {
  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-8">
        <CandidateContent
          title="Tiểu sử"
          content={candidateDetail?.biography || 'Chưa cập nhật tiểu sử'}
        />
        {/* <Separator className="my-5 bg-gray-500" />
        <CandidateContent
          title="Cover letter"
          content="Integer aliquet pretium consequat. Donec et sapien id leo accumsan pellentesque eget maximus tellus. Duis et est ac leo rhoncus tincidunt vitae vehicula augue. Donec in suscipit diam. Pellentesque quis justo sit amet arcu commodo sollicitudin. Integer finibus blandit condimentum. Vivamus sit amet ligula ullamcorper, pulvinar ante id, tristique erat. Quisque sit amet aliquam urna. Maecenas blandit felis id massa sodales finibus. Integer bibendum eu nulla eu sollicitudin. Sed lobortis diam tincidunt accumsan faucibus. Quisque blandit augue quis turpis auctor, dapibus euismod ante ultricies. Ut non felis lacinia turpis feugiat euismod at id magna. Sed ut orci arcu. Suspendisse sollicitudin faucibus aliquet."
        /> */}
      </div>
      <div className="col-span-4 space-y-5">
        <CandidateOverView candidateDetail={candidateDetail} />
        <DownloadCandidateResume />
        <CandidateContactInformation />
      </div>
    </div>
  );
}
