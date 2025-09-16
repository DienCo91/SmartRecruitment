import React from 'react';
import HeaderMain from './components/header-main';
import { TabActiveProvider } from '@/contexts';

const LayoutMain = async (props: LayoutProps<'/'>) => {
  return (
    <TabActiveProvider>
      <div className="w-full flex flex-col items-center  min-h-screen h-full">
        <HeaderMain />
        <div className="w-full">{props.children}</div>
      </div>
    </TabActiveProvider>
  );
};

export default LayoutMain;
