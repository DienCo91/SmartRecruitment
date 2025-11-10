import { Badge } from '@/components/ui/badge';
import { JobDetail } from '@/types';
import { getLabelJobType } from '@/utils';
import { LinkIcon, MailIcon, PhoneIcon } from 'lucide-react';
import Link from 'next/link';
import { AvatarCompany } from '../Avatar/AvatarUser';

export function JobHeader({ job }: { job: JobDetail }) {
  return (
    <div className="flex items-center gap-2">
      <AvatarCompany className="size-18" src={job.company.logoUrl} />
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <p id="title-job" className="font-semibold text-lg">
            {job.title}
          </p>
          {/* {is_featured && (
            <Badge className="rounded-full text-red-700 bg-red-100 capitalize">featured</Badge>
          )} */}
          <Badge className="rounded-full text-blue-700 bg-blue-100 capitalize">
            {getLabelJobType(job.jobType)}
          </Badge>
        </div>

        <div className="flex gap-5 items-center mt-3">
          <p className="flex gap-2 items-center">
            <LinkIcon size={14} />
            <Link target="_blank" href={job.company.website} className="text-sm font-normal">
              {job.company.website}
            </Link>
          </p>
          <p className="flex gap-2 items-center">
            <PhoneIcon size={14} />
            <span className="text-sm font-normal">{job.company.phone}</span>
          </p>
          <p className="flex gap-2 items-center">
            <MailIcon size={14} />
            <Link
              target="_blank"
              href={`mailto:${job.company.email}`}
              className="text-sm font-normal"
            >
              {job.company.email}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
