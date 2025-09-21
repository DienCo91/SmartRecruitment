'use client';

import * as _ from 'lodash';
import { BellIcon as NotificationIcon } from 'lucide-react';
import { CustomPopover } from '../Popovers/CustomPopover';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { NotificationCard } from './NotificationCard';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import { LoadingCircle } from '../Loadings/LoadingCircle';

export function Notifications() {
  const [notifications, setNotifications] = useState<number[]>(_.range(0, 6, 1));
  const getNoti = async () => {
    setTimeout(() => setNotifications(prev => [...prev, ..._.range(0, 6, 1)]), 2000);
  };

  const trigger = (
    <Button
      variant="ghost"
      className="text-neutral-400 hover:bg-transparent hover:text-neutral-100 cursor-pointer"
    >
      <div className="relative">
        <NotificationIcon size={16} />
        <Badge
          variant="destructive"
          className="absolute top-[-10px] text-[7px] pl-0 pr-1 rounded-full"
        >
          +99
        </Badge>
      </div>
    </Button>
  );

  return (
    <CustomPopover trigger={trigger} align="end" className="w-[400px] shadow-md shadow-blue-500/50">
      <div className="text-neutral-300 font-semibold text-lg mb-2">Thông báo</div>
      <Tabs defaultValue="unread">
        <div className="flex justify-between items-center text-neutral-300">
          <TabsList className="bg-blue-900/20">
            <TabsTrigger value="all" className="data-[state=inactive]:text-white">
              Tất cả
            </TabsTrigger>
            <TabsTrigger value="unread" className="data-[state=inactive]:text-white">
              Chưa đọc
            </TabsTrigger>
          </TabsList>
          <span className="text-xs hover:cursor-pointer hover:text-blue-300">
            Đánh dấu tất cả là đã đọc
          </span>
        </div>
        <Separator />
        <TabsContent value="all">
          <div id="scrollableAllNoti" className="h-[400px] overflow-y-auto">
            <InfiniteScroll
              scrollableTarget="scrollableAllNoti"
              dataLength={notifications.length}
              next={getNoti}
              hasMore={true}
              loader={<LoadingCircle />}
              endMessage={<p className="text-xs font-medium">Bạn đã đọc hết thông báo rồi.</p>}
            >
              {notifications.map((item, i) => (
                <NotificationCard key={i} />
              ))}
            </InfiniteScroll>
          </div>
        </TabsContent>
        <TabsContent value="unread">
          <div id="scrollableUnreadNoti" className="h-[400px] overflow-y-auto">
            <InfiniteScroll
              scrollableTarget="scrollableUnreadNoti"
              dataLength={notifications.length}
              next={getNoti}
              hasMore={true}
              loader={<LoadingCircle />}
              endMessage={<p className="text-xs font-medium">Bạn đã đọc hết thông báo rồi.</p>}
            >
              {notifications.map((item, i) => (
                <NotificationCard key={i} />
              ))}
            </InfiniteScroll>
          </div>
        </TabsContent>
      </Tabs>
    </CustomPopover>
  );
}
