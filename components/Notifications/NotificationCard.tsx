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
      className={`
      relative flex gap-3 rounded-lg p-3 my-2
      text-sm transition
      hover:cursor-pointer hover:bg-white/10
      ${!item.read ? 'bg-white/5' : 'bg-transparent'}
    `}
    >
      {!item.read && (
        <div className="w-[10px] h-[10px] absolute top-[-2px] left-[8px]">
          <span className="absolute top-[-4px] left-[-4px] inline-flex w-[18px] h-[18px] animate-ping-small  rounded-full bg-red-500 "></span>
          <div className=" bg-red-500 rounded-full w-[10px] h-[10px]" />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <p className="text-neutral-200 leading-snug line-clamp-2">{item.content}</p>
        <span className="mt-1 block text-[11px] text-gray-400">{relative}</span>
      </div>
    </div>
  );
}
