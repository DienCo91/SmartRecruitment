import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';
import { GlassCard } from '../Cards/GlassCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Link from 'next/link';

export function Ads() {
  const ads = [
    {
      src: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/banners/5fGkjr4qslcAwzc52tiO.jpg',
      alt: 'Công ty A',
    },
    {
      src: 'https://cdn-new.topcv.vn/unsafe/https://static.topcv.vn/img/bannerR1_3.png',
      alt: 'Công ty B',
    },
  ];
  return (
    <GlassCard title="" className="mt-3">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {ads.map((o, i) => (
            <CarouselItem key={i}>
              <Link href="#">
                <Image
                  src={o.src}
                  alt={o.alt}
                  className="object-cover rounded-md"
                  height={0}
                  width={400}
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-1/3 top-full size-4" />
        <CarouselNext className="right-1/3 top-full size-4" />
      </Carousel>
    </GlassCard>
  );
}
