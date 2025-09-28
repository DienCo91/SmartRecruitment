import {
  ContactInformationItem,
  PropsContactInformationItem,
} from '@/components/client/Candidates';
import { OverViewItem, PropsOverViewItem } from '@/components/client/Jobs/JobOverViewItem';

export function makeOverViewItem({ icon, title }: Omit<PropsOverViewItem, 'content'>) {
  return function _({ content }: Pick<PropsOverViewItem, 'content'>) {
    return <OverViewItem title={title} icon={icon} content={content} />;
  };
}

export function makeContactInformationItem({
  icon,
  title,
}: Omit<PropsContactInformationItem, 'content'>) {
  return function _({ content }: Pick<PropsContactInformationItem, 'content'>) {
    return <ContactInformationItem title={title} icon={icon} content={content} />;
  };
}
