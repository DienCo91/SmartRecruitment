import { GlassCard } from '../Cards/GlassCard';
import * as _ from 'lodash';
import { Tag } from './Tag';

export function PopularTags() {
  return (
    <GlassCard
      icon={<span className="text-violet-400">#</span>}
      title="Tag phổ biến"
      classContentName="flex flex-wrap p-0"
    >
      {_.range(0, 5, 1).map((_, i) => (
        <Tag key={i} content="developer" />
      ))}
      <Tag content="backend developer" />
      <Tag active content="frontend developer" />
      <Tag active content="BA" />
      <Tag active content="Data Analyst" />
    </GlassCard>
  );
}
