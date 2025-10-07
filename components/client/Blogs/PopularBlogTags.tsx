import { GlassCard } from '../Cards/GlassCard';
import { Tag } from '../Tags/Tag';
import * as _ from 'lodash';

export function PopularBlogTags() {
  return (
    <GlassCard title="Tag phổ biến" action classContentName="flex flex-wrap p-0">
      {_.range(0, 5, 1).map((_, i) => (
        <Tag key={i} content="Design" />
      ))}
      <Tag content="programing" />
      <Tag content="frontend developer" />
      <Tag content="BA" />
      <Tag active content="Data Analyst" />
    </GlassCard>
  );
}
