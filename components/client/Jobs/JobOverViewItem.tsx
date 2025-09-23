import { makeOverViewItem } from '@/helpers/functions';
import {
  AtomIcon,
  BookTypeIcon,
  BriefcaseBusinessIcon,
  CalendarIcon,
  Clock10Icon,
  MapPinIcon,
  WalletIcon,
} from 'lucide-react';
import { ReactNode } from 'react';

export interface PropsJobOverViewItem {
  icon: ReactNode;
  title: string;
  content: string;
}

export function JobOverViewItem({ icon, title, content }: PropsJobOverViewItem) {
  return (
    <div className="flex flex-col col-span-1 text-xs">
      {icon}
      <p className="text-gray-300 uppercase mt-3">{title}</p>
      <p className="font-semibold">{content}</p>
    </div>
  );
}

export const JobOverViewItems = {
  Posted: makeOverViewItem({
    icon: <CalendarIcon size={22} />,
    title: 'Job posted',
  }),
  ExpiredIn: makeOverViewItem({
    icon: <Clock10Icon size={22} />,
    title: 'Expired in',
  }),
  Education: makeOverViewItem({
    icon: <BriefcaseBusinessIcon size={22} />,
    title: 'Education',
  }),
  Salary: makeOverViewItem({
    icon: <WalletIcon size={22} />,
    title: 'Salary',
  }),
  Location: makeOverViewItem({
    icon: <MapPinIcon size={22} />,
    title: 'Location',
  }),
  JobType: makeOverViewItem({
    icon: <BookTypeIcon size={22} />,
    title: 'Job type',
  }),
  Experience: makeOverViewItem({
    icon: <AtomIcon size={22} />,
    title: 'Experience',
  }),
};
