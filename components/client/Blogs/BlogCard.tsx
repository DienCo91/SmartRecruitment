import Image from 'next/image';

export function BlogCard() {
  return (
    <div className="flex justify-between bg-white/5 p-0 rounded-sm shadow-sm hover:bg-white/15 hover:shadow-lg group/blog-card">
      <div className="p-2 flex flex-col gap-2">
        <span className="font-semibold line-clamp-2 hover:text-blue-400 hover:cursor-pointer">
          Ngành IT là gì? Mô tả chi tiết công việc của ngành IT
        </span>
        <span className="text-xs text-gray-400">Đăng vào ngày 12/09/2025</span>
        <span className="text-xs text-neutral-300 line-clamp-2">
          Trong thời đại công nghệ thông tin ngày càng phát triển, ngành IT đã và đang trở thành
          công việc “hot” được nhiều bạn trẻ theo đuổi. Tuy nhiên, ngành IT là gì? Đâu là những công
          việc chính của
        </span>
      </div>
      <div className="relative h-[150px] w-[500px] rounded-r-sm overflow-hidden">
        <Image
          src="https://cdn-new.topcv.vn/unsafe/300x/https://static.topcv.vn/cms/nganh-it-la-gi-topcv-0.png66fa10014a87b.png"
          alt="thumbnail"
          fill
          className="object-cover rounded-r-sm group-hover/blog-card:scale-110 duration-300"
        />
      </div>
    </div>
  );
}
