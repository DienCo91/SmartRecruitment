import { NotificationMessage } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

export function NotificationCard({
  item,
  onRead,
}: {
  item: NotificationMessage;
  onRead: () => void;
}) {
  const date = item.createdAt;
  const relative = formatDistanceToNow(date, { addSuffix: true, locale: vi });
  return (
    <div
      onClick={onRead}
      className="relative flex items-start rounded-xs my-2 p-2 text-xs bg-white/5 hover:cursor-pointer hover:bg-white/10"
    >
      {!item.read && (
        <div className="w-[10px] h-[10px] absolute top-[-2px] left-[8px]">
          <span className="absolute top-[-4px] left-[-4px] inline-flex w-[18px] h-[18px] animate-ping-small  rounded-full bg-red-500 "></span>
          <div className=" bg-red-500 rounded-full w-[10px] h-[10px]" />
        </div>
      )}
      {/* <AvatarUser className="size-8" src="" /> */}
      <span className="line-clamp-2 px-3 py-1 text-neutral-300 pr-[50px] ">{item.content}</span>
      <span className=" text-[12px] text-gray-400 ">{relative}</span>
    </div>
  );
}
