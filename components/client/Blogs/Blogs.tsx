import { GlassCard } from '../Cards/GlassCard';
import { BlogCard } from './BlogCard';

export function Blogs() {
  return (
    <GlassCard
      icon="📚"
      title="Cẩm nang làm việc"
      action={<span className="hover:text-blue-500 cursor-pointer text-sm">Xem tất cả</span>}
      className="mt-5"
      classContentName="p-0"
    >
      <div className="flex flex-col gap-3">
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </GlassCard>
  );
}
