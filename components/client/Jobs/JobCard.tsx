// import { BaseProps } from "@/types";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { CalendarIcon, HeartIcon, MapPinIcon, WalletIcon } from 'lucide-react';
import { CustomImage } from '../Images/CustomImage';
import Link from 'next/link';
import { Router } from '@/constants';

// interface Props extends BaseProps {
//   job: unknown;
//   //
// }

export function JobCard() {
  return (
    <div className="flex mt-3 gap-3 bg-white/5 p-3 rounded-xl shadow-sm hover:bg-white/15 hover:shadow-lg">
      <CustomImage src="" alt="" className="w-[80px]" />

      {/* Thông tin job */}
      <div className="flex-1 flex-col w-full">
        <div className="flex relative justify-between items-center">
          <Link
            href={Router.JOB.DETAIL(
              'chuyen-vien-kinh-doanh-giai-phap-thanh-toan-tu-van-tin-dung-doanh-nghiep'
            )}
            className="font-semibold text-neutral-300 hover:text-blue-400 hover:cursor-pointer w-[550px] line-clamp-2"
          >
            Chuyên Viên Kinh Doanh Giải Pháp Thanh Toán / Tư Vấn Tín Dụng Doanh Nghiệp
          </Link>
          <div className="absolute flex gap-1 right-0">
            <Badge variant="destructive" className="bg-red-800 block">
              Nổi bật
            </Badge>
            <Badge variant="secondary" className="block">
              Fulltime
            </Badge>
          </div>
        </div>
        <span className="text-gray-400 text-sm">Ngân hàng TMCP Quân Đội</span>
        <div className="flex gap-2 text-xs text-gray-400 mt-1">
          <span className="flex items-center gap-1">
            <MapPinIcon size={14} />
            Hà Nội
          </span>
          <span className="flex items-center gap-1">
            <WalletIcon size={14} />
            20 - 30 triệu
          </span>
          <span className="flex items-center gap-1">
            <CalendarIcon size={14} />
            Còn 4 ngày để ứng tuyển
          </span>
        </div>
        <hr className="my-2" />
        <div className="flex items-center justify-between gap-2">
          <div>
            <Label className="text-xs inline">Yêu cầu: </Label>
            <Badge
              variant="outline"
              className="bg-transparent border-none shadow text-neutral-300 shadow-blue-900"
            >
              1 năm kinh nghiệm
            </Badge>
          </div>
          <div>
            <Button variant="ghost" className="hover:bg-transparent hover:text-red-500">
              <HeartIcon size={14} fill="red" />
            </Button>
            <Button variant="outline" className="bg-white/30 hover:bg-white/20 hover:text-gray-200">
              Ứng tuyển
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
