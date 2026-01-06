import ChatContainer from '@/components/client/Chatting/ChatContainer';
import React from 'react';
import ChatLayoutWrapper from './chat-wrapper';

const ChattingLayout = async (props: LayoutProps<'/chatting'>) => {
  return (
    <ChatLayoutWrapper>
      <div
        className="flex mt-[20px]  flex-col lg:flex-row gap-2"
        style={{ height: 'calc(100vh - 100px)' }}
      >
        <div className="h-[400px] lg:h-full">
          <ChatContainer />
        </div>
        <div className="flex flex-1">{props.children}</div>
      </div>
    </ChatLayoutWrapper>
  );
};

export default ChattingLayout;
