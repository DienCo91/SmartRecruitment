'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Country, CountryDropdown } from '@/components/ui/country-dropdown';
import { Input } from '@/components/ui/input';
import LogoApp from '@/components/ui/logo-app';
import { LIST_TAB_HEADER_MAIN } from '@/constants/tab';
import { useTabMainActive } from '@/contexts';
import { useChangeUrl } from '@/hooks';
import WrapperCommon from '@/layout/wrapper-common';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const HeaderMain = () => {
  useChangeUrl();
  const router = useRouter();

  const { setTab, tab } = useTabMainActive();
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  //handle animation
  useEffect(() => {
    if (containerRef.current) {
      const activeIndex = LIST_TAB_HEADER_MAIN.findIndex(item => item.title === tab.title);
      const activeEl = containerRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        setIndicatorStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
        });
      }
    }
  }, [tab]);

  const onChange = (country: Country) => {
    console.log('country', country);
  };

  const onChangeTab = (tab: (typeof LIST_TAB_HEADER_MAIN)[number]) => {
    setTab(tab);
    router.push(tab.link);
  };

  return (
    <>
      <WrapperCommon>
        <div className="relative flex" ref={containerRef}>
          {LIST_TAB_HEADER_MAIN.map((item, index) => {
            const isActive = item.title === tab.title;
            return (
              <div
                onClick={() => onChangeTab(item)}
                key={index}
                className={cn(
                  'mr-[24px] text-[14px] cursor-pointer relative transition-all duration-400 ease-in-out py-[14px] hover:text-blue-primary',
                  isActive ? 'text-blue-primary font-[500]' : 'text-[#5E6670]'
                )}
              >
                {item.title}
              </div>
            );
          })}

          <span
            className="absolute bottom-0 h-[2px] bg-blue-primary transition-all duration-300"
            style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          />
        </div>
      </WrapperCommon>
      <WrapperCommon classNameWrapper="bg-white" classNameInner="flex items-center py-[24px]">
        <LogoApp className="w-[140px]" />
        <div className="flex border-[1px] border-grey-primary rounded-[4px] ml-[32px] items-center flex-6">
          <CountryDropdown
            placeholder="Select country"
            defaultValue="USA"
            onChange={onChange}
            className="border-none shadow-none w-[200px] focus:ring-0 hover:bg-gray-100 rounded-none py-[20px]"
          />
          <div className="h-[20px] w-[2px] bg-grey-primary"></div>
          <div className="flex items-center ml-[16px] w-full">
            <Search size={18} className="text-blue-primary" />
            <Input
              placeholder="Job title, keywords, company..."
              className="border-none shadow-none focus-visible:ring-0 border-l-[1px] border-grey-primary "
            />
          </div>
        </div>
        <div className="flex flex-2 justify-end">
          <Avatar className="w-[44px] h-[44px] shadow-md">
            <AvatarImage src="https://images.pexels.com/photos/33514898/pexels-photo-33514898.jpeg" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </WrapperCommon>
    </>
  );
};

export default HeaderMain;
