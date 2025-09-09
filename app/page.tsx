'use client';

import { useRouter } from 'next/navigation';
import HoverPrefetchLink from './ui/hover-prefetch-link';

export default function Home() {
  const router = useRouter();

  const onPress = () => {
    router.replace('/blog/1?name=minh');
  };

  return (
    <div className="font-sans flex flex-col items-center justify-items-center  p-8 pb-20  sm:p-20">
      This is the home page
      {[1, 2, 3, 4, 5, 6].map((item, index) => {
        return (
          <HoverPrefetchLink key={index} href={`/blog/${index}?name=${index + 2}`}>
            Blog {index}
          </HoverPrefetchLink>
        );
      })}
      <div onClick={onPress}>Use hook useRouter</div>
    </div>
  );
}
