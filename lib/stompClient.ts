import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessage, NotificationMessage } from '@/types/chat';

let stompClient: Client | null = null;

export const connectStomp = (
  token: string,
  onChatMessage?: (msg: ChatMessage) => void,
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
        const body: ChatMessage = JSON.parse(message.body);
        onChatMessage?.(body);
      });

      // NOTIFICATIONS
      stompClient?.subscribe('/user/queue/notifications', (message: IMessage) => {
        const body: NotificationMessage = JSON.parse(message.body);
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
