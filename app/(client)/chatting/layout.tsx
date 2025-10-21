import ChatContainer from '@/components/client/Chatting/ChatContainer';
import React from 'react';

const ChattingLayout = async (props: LayoutProps<'/chatting'>) => {
  return (
    <div className="flex mt-[20px]" style={{ height: 'calc(100vh - 100px)' }}>
      <ChatContainer />
      <div className="flex flex-1">{props.children}</div>
    </div>
  );
};

export default ChattingLayout;
