import { Blog } from '@/types/blog';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  blog: Blog;
}

export function BlogCard({ blog }: Props) {
  return (
    <div className="flex justify-between bg-white/5 p-0 rounded-sm shadow-sm hover:bg-white/15 hover:shadow-lg group/blog-card">
      <div className="p-2 flex flex-col gap-2">
        <Link
          href={`/blogs/${blog.slug}`}
          className="font-semibold line-clamp-2 hover:text-blue-400 hover:cursor-pointer"
        >
          {blog.title}
        </Link>
        <span className="text-xs text-gray-400">
          Đăng vào ngày {format(blog.publishedAt!, 'dd/MM/yyyy')}
        </span>
        <span className="text-xs text-neutral-300 line-clamp-2">{blog.description}</span>
      </div>
      <div className="relative h-[150px] w-[700px] rounded-r-sm overflow-hidden">
        <Image
          src={blog.thumbnail}
          alt="thumbnail"
          fill
          className="object-cover rounded-r-sm group-hover/blog-card:scale-110 duration-300"
        />
      </div>
    </div>
  );
}
