import { CalendarIcon, MessageCircleMoreIcon } from 'lucide-react';
import { GlassCard } from '../Cards/GlassCard';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { CustomImage } from '../Images/CustomImage';
import Link from 'next/link';

export function BlogCardPrimary() {
  return (
    <GlassCard title="" action classContentName="px-0">
      <div className="flex">
        <CustomImage
          src="https://cdn-new.topcv.vn/unsafe/300x/https://static.topcv.vn/cms/ly-do-nghi-viec-cong-ty-cu-topcv1.jpg681c28011f16e.jpg"
          alt=""
          className="h-[152px] w-[217px]"
        />

        <div className="flex flex-1 items-baseline pl-5">
          <div className="flex flex-col gap-2">
            <div className="flex gap-5 text-sm font-normal">
              <div className="flex items-center gap-1 capitalize">
                <CalendarIcon size={16} />
                <span>{format(new Date(), 'dd MMM, yyyy', { locale: vi })}</span>
              </div>
              <div className="flex items-center gap-1">
                <MessageCircleMoreIcon size={16} />
                <span>{25} Bình luận</span>
              </div>
            </div>

            <Link
              href={`/blogs/${'ly-do-nghi-viec-cong-ty-cu'}`}
              className="line-clamp-2 font-semibold hover:text-blue-300"
            >
              10 lý do nghỉ việc công ty cũ khéo léo và thuyết phục nhà tuyển dụng
            </Link>

            <p className="line-clamp-3 text-sm font-normal">
              Đối diện với câu hỏi phỏng vấn &#34;Vì sao bạn nghỉ việc ở công ty cũ?&#34; trong buổi
              phỏng vấn, nhiều ứng viên không khỏi cảm thấy bối rối. Một câu trả lời thiếu tế nhị có
              thể vô tình đóng sập cánh cửa cơ hội. Tuy nhiên, nếu được chuẩn bị kỹ lưỡng và biết
              cách khéo léo diễn đạt, đây lại chính là dịp để bạn thể hiện sự trưởng thành, những
              mục tiêu nghề nghiệp rõ ràng và khả năng giao tiếp tinh tế của mình.
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
