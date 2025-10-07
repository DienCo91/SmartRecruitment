import { GlassCard } from '../Cards/GlassCard';
import * as _ from 'lodash';
import { RecentBlogCard } from './RecentBlogCard';

export function RecentBlogs() {
  return (
    <GlassCard
      title={<h3 className="mb-3 font-semibold text-lg">Bài viết gần đây</h3>}
      action
      classContentName="px-0"
    >
      {_.range(0, 3).map((item, index) => (
        <RecentBlogCard key={index} />
      ))}
    </GlassCard>
  );
}
