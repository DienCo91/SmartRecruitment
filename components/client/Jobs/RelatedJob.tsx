import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';
import { JobCardMini } from './JobCardMini';
import * as _ from 'lodash';

export function RelatedJob() {
  return (
    <>
      <div className="flex justify-between">
        <h3 className="font-semibold text-xl">Related Jobs</h3>
        <div className="space-x-2">
          <Button
            disabled
            variant="outline"
            className="bg-white/30 hover:bg-white/20 hover:text-gray-200"
          >
            <ArrowLeftIcon size={16} />
          </Button>
          <Button variant="outline" className="bg-white/30 hover:bg-white/20 hover:text-gray-200">
            <ArrowRightIcon size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 mt-5 gap-3">
        {_.range(0, 6).map((item, index) => (
          <JobCardMini key={index} />
        ))}
      </div>
    </>
  );
}
