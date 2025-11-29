import { Blog } from '@/types/blog';
import { format } from 'date-fns';
import Link from 'next/link';
import { CustomImage } from '../Images/CustomImage';

interface Props {
  blog: Blog;
}

export function BlogCard({ blog }: Props) {
  return (
    <div className="flex justify-between bg-white/5 p-0 rounded-sm shadow-sm hover:bg-white/15 hover:shadow-lg group/blog-card">
      <div className="p-2 flex flex-col gap-2 flex-1">
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
      <CustomImage
        src={blog.thumbnail}
        alt="thumbnail"
        className=" h-[150px] w-[150px] bg-transparent border-0 shadow-none"
        classNameImage="object-cover"
      />
    </div>
  );
}
