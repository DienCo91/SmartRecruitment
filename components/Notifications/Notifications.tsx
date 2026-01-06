'use client';

import { NotificationServices } from '@/services/notice.services';
import { BellIcon as NotificationIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { LoadingCircle } from '../Loadings/LoadingCircle';
import { CustomPopover } from '../Popovers/CustomPopover';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { NotificationCard } from './NotificationCard';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import {
  setNotifications,
  setTotalUnread,
  updateNotificationsRead,
} from '@/lib/features/notification/notificationSlice';
import { cn } from '@/lib/utils';

const SIZE = 20;

export function Notifications({ className, title }: { className?: string; title?: string }) {
  const dispatch = useAppDispatch();
  const totalUnread = useAppSelector(state => state.notification.totalUnread);
  const notifications = useAppSelector(state => state.notification.notifications);

  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<string | null>();

  const getNoti = async (page: number) => {
    try {
      const payload: {
        page?: number;
        size?: number;
        isRead?: boolean;
      } = {
        page: page,
        size: SIZE,
      };
      if (filter) payload.isRead = false;
      const res = await NotificationServices.getMyNotifications(payload);

      if (page === 1) {
        dispatch(setNotifications(res.data.content));
      } else {
        dispatch(setNotifications([...notifications, ...res.data.content]));
      }
      if (res.data.content.length < SIZE) {
        setHasMore(false);
      } else {
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getTotalUnread = async () => {
    try {
      const res = await NotificationServices.getUnreadCount();

      dispatch(setTotalUnread(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleReadAll = async () => {
    try {
      await NotificationServices.markAllAsRead();
      dispatch(setTotalUnread(0));
      dispatch(setNotifications(notifications.map(noti => ({ ...noti, read: true }))));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTotalUnread();
    dispatch(setNotifications([]));
    setHasMore(true);
    getNoti(1);
  }, [filter]);

  const fetchMoreData = async () => {
    if (!hasMore) return;
    getNoti(page);
  };

  const onRead = async (id: number) => {
    try {
      await NotificationServices.markAsRead(id);
      dispatch(setTotalUnread(totalUnread - 1));
      dispatch(updateNotificationsRead(id));
    } catch (error) {
      console.log(error);
    }
  };

  const trigger = (
    <Button
      variant="ghost"
      className={cn(
        'text-neutral-400 hover:bg-transparent hover:text-neutral-100 cursor-pointer',
        className
      )}
    >
      <div className="relative ">
        <NotificationIcon size={100} />

        {totalUnread > 0 && (
          <Badge
            variant="destructive"
            className="absolute top-[-10px] text-[12px] p-0 px-[4px] rounded-full"
          >
            {totalUnread > 99 ? '99+' : totalUnread}
          </Badge>
        )}
      </div>
      {title}
    </Button>
  );

  return (
    <CustomPopover
      trigger={trigger}
      align="end"
      className="w-[400px]  shadow-md shadow-blue-500/50"
      onOpenChange={isOpen => {
        if (isOpen) {
          setFilter(null);
        }
      }}
    >
      <div className="text-neutral-300 font-semibold text-lg mb-2">Thông báo</div>
      <Tabs defaultValue="all">
        <div className="flex justify-between items-center text-neutral-300">
          <TabsList className="bg-blue-900/20">
            <TabsTrigger
              value="all"
              className="data-[state=inactive]:text-white"
              onClick={() => setFilter(null)}
            >
              Tất cả
            </TabsTrigger>
            <TabsTrigger
              value="unread"
              className="data-[state=inactive]:text-white"
              onClick={() => setFilter('unread')}
            >
              Chưa đọc
            </TabsTrigger>
          </TabsList>
          <span
            className="text-xs hover:cursor-pointer hover:text-blue-300"
            onClick={handleReadAll}
          >
            Đánh dấu tất cả là đã đọc
          </span>
        </div>
        <Separator />

        <TabsContent value="all" className="h-[400px]">
          {!notifications || (notifications.length === 0 && !hasMore) ? (
            <div className="flex justify-center mt-4 text-[14px] text-gray-400">
              Không có đoạn chat nào
            </div>
          ) : (
            <div id="scrollableAllNoti" className="h-[400px] overflow-y-auto ">
              <InfiniteScroll
                scrollableTarget="scrollableAllNoti"
                dataLength={notifications.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<LoadingCircle />}
                style={{ overflow: 'hidden' }}
              >
                {notifications.map((item, i) => (
                  <NotificationCard key={i} item={item} onRead={() => onRead(item.id)} />
                ))}
              </InfiniteScroll>
            </div>
          )}
        </TabsContent>
        <TabsContent value="unread">
          {!notifications || (notifications.length === 0 && !hasMore) ? (
            <div className="flex justify-center mt-4 text-[14px] text-gray-400">
              Không có đoạn chat nào
            </div>
          ) : (
            <div id="scrollableUnreadNoti" className="h-[400px] overflow-y-auto">
              <InfiniteScroll
                scrollableTarget="scrollableUnreadNoti"
                dataLength={notifications.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<LoadingCircle />}
              >
                {notifications.map((item, i) => (
                  <NotificationCard key={i} item={item} onRead={() => onRead(item.id)} />
                ))}
              </InfiniteScroll>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </CustomPopover>
  );
}
