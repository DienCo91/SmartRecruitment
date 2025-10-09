import Link from 'next/link';
import { GlassCard } from '../Cards/GlassCard';
import { BlogCard } from './BlogCard';

export function Blogs() {
  return (
    <GlassCard
      icon="📚"
      title="Cẩm nang việc làm"
      action={
        <Link href="/blogs" className="hover:text-white cursor-pointer text-sm">
          Xem tất cả
        </Link>
      }
      className="mt-5"
      classContentName="p-0"
    >
      <div className="flex flex-col gap-3">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </GlassCard>
  );
}
