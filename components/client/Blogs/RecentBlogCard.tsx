import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import Link from 'next/link';
import { GlassCard } from '../Cards/GlassCard';
import { CustomImage } from '../Images/CustomImage';

export function RecentBlogCard() {
  return (
    <GlassCard title="" action classContentName="px-0" className="mb-3">
      <div className="flex">
        <CustomImage
          src="https://cdn-new.topcv.vn/unsafe/300x/https://static.topcv.vn/cms/ly-do-nghi-viec-cong-ty-cu-topcv1.jpg681c28011f16e.jpg"
          alt=""
          className="h-[75px] w-[100px]"
        />

        <div className="flex flex-1 items-baseline pl-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm font-normal">
              <div className="flex items-center gap-1 capitalize">
                <span>{format(new Date(), 'dd MMM, yyyy', { locale: vi })}</span>
              </div>
              <span className="rounded-full size-1 bg-gray-300" />
              <div className="flex items-center gap-1">
                <span>{25} Bình luận</span>
              </div>
            </div>

            <Link
              href={`/blogs/${'ly-do-nghi-viec-cong-ty-cu'}`}
              className="line-clamp-2 font-semibold hover:text-blue-300"
              title="10 lý do nghỉ việc công ty cũ khéo léo và thuyết phục nhà tuyển dụng"
            >
              10 lý do nghỉ việc công ty cũ khéo léo và thuyết phục nhà tuyển dụng
            </Link>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
