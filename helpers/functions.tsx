import {
  ContactInformationItem,
  PropsContactInformationItem,
} from '@/components/client/Candidates';
import { OverViewItem, PropsOverViewItem } from '@/components/client/Jobs/JobOverViewItem';
import { Badge } from '@/components/ui/badge';
import { blogStatus, BlogStatus } from '@/types/blog';

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

export function renderStatus(status: BlogStatus) {
  const colorMap = {
    [BlogStatus.DRAFT]: 'border-gray-400 bg-gray-400 text-white rounded-full w-[100px]',
    [BlogStatus.REQUESTED]: 'border-yellow-500 bg-yellow-500 text-white rounded-full w-[100px]',
    [BlogStatus.PUBLISHED]: 'border-green-500 bg-green-500 text-white rounded-full w-[100px]',
  };
  switch (status) {
    case BlogStatus.DRAFT:
      return <Badge className={colorMap[BlogStatus.DRAFT]}>{blogStatus[BlogStatus.DRAFT]}</Badge>;
    case BlogStatus.REQUESTED:
      return (
        <Badge className={colorMap[BlogStatus.REQUESTED]}>{blogStatus[BlogStatus.REQUESTED]}</Badge>
      );
    case BlogStatus.PUBLISHED:
      return (
        <Badge className={colorMap[BlogStatus.PUBLISHED]}>{blogStatus[BlogStatus.PUBLISHED]}</Badge>
      );
  }
}
