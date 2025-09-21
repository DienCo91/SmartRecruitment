import { BriefcaseBusinessIcon } from 'lucide-react';
import Image from 'next/image';

export function CompanyCard() {
  return (
    <div className="flex flex-col bg-white/5 p-3 rounded-xl shadow-sm hover:bg-white/15 hover:shadow-lg">
      <div className="flex mt-3 gap-3 ">
        <div className="w-20 h-20 relative rounded-md overflow-hidden bg-white shadow-sm shadow-blue-900">
          <Image
            src="https://cdn-new.topcv.vn/unsafe/80x/https://static.topcv.vn/company_logos/UdiO7Pguf3akX65drUOKRz0N5dcyKWWr_1737604772____3a6bc78024143aefa7a42eaf3e57e674.png"
            alt="thumbnail"
            fill
            className="object-contain p-1"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between w-full">
          <div>
            <p className="font-semibold text-neutral-300 hover:text-blue-400 line-clamp-2 hover:cursor-pointer">
              Công ty TNHH Đầu tư ứng dụng sản xuất bao bì Việt
            </p>
            <p className="text-gray-400 text-sm line-clamp-2">IT - Phần mềm</p>
          </div>
        </div>
      </div>
      <p className="flex items-center mt-2 gap-1 text-xs text-neutral-300">
        <BriefcaseBusinessIcon size={14} />
        <span className="font-semibold">2 việc làm</span>
      </p>
    </div>
  );
}
