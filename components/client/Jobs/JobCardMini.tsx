import { Badge } from '@/components/ui/badge';
import { GlassCard } from '../Cards/GlassCard';
import { CustomImage } from '../Images/CustomImage';
import { MapPinIcon } from 'lucide-react';

export function JobCardMini() {
  return (
    <GlassCard
      className="hover:cursor-pointer"
      title={
        <div className="flex gap-3">
          <CustomImage src="" alt="" />
          <div className="space-x-2 space-y-1">
            <p className="font-semibold line-clamp-1 text-sm" title="Company name">
              Viettel
            </p>
            <Badge className="rounded-full text-red-700 bg-red-100 capitalize">featured</Badge>
            <span className="text-xs flex items-center gap-1">
              <MapPinIcon size={14} />
              Hà nội
            </span>
          </div>
        </div>
      }
      action
    >
      <div className="flex">
        <p className="font-semibold line-clamp-1" title="Senior Front-End Developer (Angular)">
          Senior Front-End Developer (Angular)
        </p>
      </div>
      <div className="text-xs flex items-center">
        <span>Part time</span>
        <span className="size-1 inline-block rounded-full border bg-white mx-2" />
        <span>$1K - $5K</span>
      </div>
    </GlassCard>
  );
}
