import { JobOverViewItem, PropsJobOverViewItem } from '@/components/client/Jobs/JobOverViewItem';

export function makeOverViewItem({ icon, title }: Omit<PropsJobOverViewItem, 'content'>) {
  return function _({ content }: Pick<PropsJobOverViewItem, 'content'>) {
    return <JobOverViewItem title={title} icon={icon} content={content} />;
  };
}
