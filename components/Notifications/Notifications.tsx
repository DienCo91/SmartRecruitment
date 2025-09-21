'use client';

import * as _ from 'lodash';
import { BellIcon as NotificationIcon } from 'lucide-react';
import { CustomPopover } from '../Popovers/CustomPopover';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { NotificationCard } from './NotificationCard';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';

export function Notifications() {
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
            <TabsTrigger value="unread" className="data-[state=inactive]:text-white">
              Chưa đọc
            </TabsTrigger>
            <TabsTrigger value="read" className="data-[state=inactive]:text-white">
              Đã đọc
            </TabsTrigger>
          </TabsList>
          <span className="text-xs hover:cursor-pointer"> Đánh dấu tất cả là đã đọc</span>
        </div>
        <Separator />
        <TabsContent value="unread">
          {_.range(0, 6, 1).map((_, i) => (
            <NotificationCard key={i} />
          ))}
        </TabsContent>
        <TabsContent value="read">
          {_.range(0, 6, 1).map((_, i) => (
            <NotificationCard key={i} />
          ))}
        </TabsContent>
      </Tabs>
    </CustomPopover>
  );
}
