import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage, Message, NotificationMessage } from '@/types/chat';
import { toast } from 'sonner';
import { CustomToast } from '@/components/toast/custom-toast';
import { store } from './store';
import { setLastMessageStomp, updateLastMessage } from './features/chat/chatSlice';
import { setNotifications, setTotalUnread } from './features/notification/notificationSlice';
import { Info } from 'lucide-react';

let stompClient: Client | null = null;

export enum NotificationType {
  NEW_MESSAGE = 'NEW_MESSAGE',
  JOB_APPLICATION = 'JOB_APPLICATION',
  APPLICATION_STATUS_CHANGE = 'APPLICATION_STATUS_CHANGE',
  SYSTEM_ALERT = 'SYSTEM_ALERT',
}

const getTitle = (type: string) => {
  switch (type) {
    case NotificationType.NEW_MESSAGE:
      return 'New message';
    case NotificationType.JOB_APPLICATION:
      return 'New job application';
    case NotificationType.APPLICATION_STATUS_CHANGE:
      return 'Application status change';
    case NotificationType.SYSTEM_ALERT:
      return 'System alert';
  }
};

export const connectStomp = (
  token: string,
  onChatMessage?: (msg: Message) => void,
  onNotification?: (msg: NotificationMessage) => void
) => {
  stompClient = new Client({
    webSocketFactory: () => new SockJS('http://localhost:8080/ws'),

    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },

    debug: (msg: string) => console.log(msg),

    onConnect: () => {
      console.log('STOMP connected');

      // CHAT MESSAGE
      stompClient?.subscribe('/user/queue/messages', (message: IMessage) => {
        const body: Message = JSON.parse(message.body);

        const state = store.getState();
        const currentConversationId = state.chat.conversationCurrent?.conversationId;
        if (body.conversationId === currentConversationId) {
          store.dispatch(updateLastMessage(body));
        }
        store.dispatch(setLastMessageStomp(body));
        onChatMessage?.(body);
      });

      // NOTIFICATIONS
      stompClient?.subscribe('/user/queue/notifications', (message: IMessage) => {
        const body: NotificationMessage = JSON.parse(message.body);
        const state = store.getState();
        const currentConversationId = state.chat.conversationCurrent?.conversationId;

        console.log('body.relatedId', body.relatedId, currentConversationId);

        const title = getTitle(body.type);

        if (
          body.type === NotificationType.NEW_MESSAGE &&
          body.relatedId !== currentConversationId
        ) {
          toast.custom(t => <CustomToast t={t} title={title} message={body?.content} icon="💬" />);
        } else if (body.type !== NotificationType.NEW_MESSAGE) {
          toast.custom(t => <CustomToast t={t} title={title} message={body?.content} />);
        } else {
          toast.custom(t => (
            <CustomToast t={t} title={title} message={body?.content} icon={<Info />} />
          ));
        }
        store.dispatch(setNotifications([body, ...state.notification.notifications]));
        store.dispatch(setTotalUnread(state.notification.totalUnread + 1));

        onNotification?.(body);
      });
    },

    onStompError: frame => {
      console.error('STOMP error:', frame.headers['message']);
      console.error('Details:', frame.body);
    },
  });

  stompClient.activate();
};

export const sendChatMessage = (msg: ChatMessage) => {
  if (stompClient && stompClient.connected) {
    stompClient.publish({
      destination: '/app/chat',
      body: JSON.stringify(msg),
    });
  } else {
    console.warn('STOMP not connected');
  }
};

export const disconnectStomp = () => {
  stompClient?.deactivate();
};
