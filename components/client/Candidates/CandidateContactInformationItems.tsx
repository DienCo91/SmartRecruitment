import { makeContactInformationItem } from '@/helpers/functions';
import { GlobeIcon, MailIcon, MapPinIcon, PhoneIcon } from 'lucide-react';

export const CandidateContactInformationItems = {
  Website: makeContactInformationItem({ icon: <GlobeIcon size={22} />, title: 'Website' }),
  Location: makeContactInformationItem({
    icon: <MapPinIcon size={22} />,
    title: 'Cư trú',
  }),
  Phone: makeContactInformationItem({
    icon: <PhoneIcon size={22} />,
    title: 'Điện thoại',
  }),
  Email: makeContactInformationItem({
    icon: <MailIcon size={22} />,
    title: 'Email',
  }),
};
