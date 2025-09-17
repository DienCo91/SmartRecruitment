import { Avatar } from '../client/Avatar/Avatar';

export function NotificationCard() {
  return (
    <div className="relative flex items-center rounded-xs my-2 p-2 text-xs bg-white/15 hover:cursor-pointer hover:bg-white/40">
      <Avatar className="size-6" src="" />
      <span className="line-clamp-2 px-3 py-1">
        Bạn đã nộp CV cho nhà tuyển dụng Viettel, hehehe Bạn đã nộp CV cho nhà tuyển dụng Viettel,
        heheheiettel, hehehe Bạn điettel, hehehe Bạn đ
      </span>
      <span
        className="absolute top-0 right-0"
        style={{
          color: 'var(--color-gray-300)',
        }}
      >
        1 phút trước
      </span>
    </div>
  );
}
