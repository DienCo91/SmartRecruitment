import { Avatar } from '../client/Avatar/Avatar';

export function NotificationCard() {
  return (
    <div className="relative flex items-start rounded-xs my-2 p-2 text-xs bg-white/5 hover:cursor-pointer hover:bg-white/10">
      <Avatar className="size-8" src="" />
      <span className="line-clamp-2 px-3 py-1 text-neutral-300 pr-[50px]">
        Bạn đã nộp CV cho nhà tuyển dụng Viettel, hehehe Bạn đã nộp CV cho nhà tuyển dụng Viettel,
        heheheiettel, hehehe Bạn điettel, hehehe Bạn đ
      </span>

      {/* Thời gian ở góc phải trên */}
      <span className="absolute top-1 right-2 text-[11px] text-gray-400">1 phút trước</span>
    </div>
  );
}
