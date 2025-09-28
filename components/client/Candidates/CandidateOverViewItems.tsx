import { makeOverViewItem } from '@/helpers/functions';
import {
  CakeIcon,
  CircleUserRoundIcon,
  ClipboardListIcon,
  GraduationCapIcon,
  LayersIcon,
  MapIcon,
} from 'lucide-react';

export const CandidateOverViewItems = {
  BirthOfDate: makeOverViewItem({
    icon: <CakeIcon size={22} />,
    title: 'Sinh nhật',
  }),
  National: makeOverViewItem({
    icon: <MapIcon size={22} />,
    title: 'Quốc tịch',
  }),
  MaritalStatus: makeOverViewItem({
    icon: <ClipboardListIcon size={22} />,
    title: 'Tình trạng hôn nhân',
  }),
  Gender: makeOverViewItem({
    icon: <CircleUserRoundIcon size={22} />,
    title: 'Giới tính',
  }),
  Experience: makeOverViewItem({
    icon: <LayersIcon size={22} />,
    title: 'Kinh nghiệm',
  }),
  Education: makeOverViewItem({
    icon: <GraduationCapIcon size={22} />,
    title: 'Học vấn',
  }),
};
