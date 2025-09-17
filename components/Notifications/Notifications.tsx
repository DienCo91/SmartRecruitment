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
      <Tabs defaultValue="unread">
        <TabsList className="bg-blue-900">
          <TabsTrigger value="unread" className="data-[state=inactive]:text-white">
            Chưa đọc
          </TabsTrigger>
          <TabsTrigger value="read" className="data-[state=inactive]:text-white">
            Đã đọc
          </TabsTrigger>
        </TabsList>
        <Separator />
        <TabsContent value="unread">
          {_.range(0, 7, 1).map((_, i) => (
            <NotificationCard key={i} />
          ))}
        </TabsContent>
        <TabsContent value="read">
          {_.range(0, 7, 1).map((_, i) => (
            <NotificationCard key={i} />
          ))}
        </TabsContent>
      </Tabs>
    </CustomPopover>
  );
}
