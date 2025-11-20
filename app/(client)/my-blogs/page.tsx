'use client';

import { GlassCard } from '@/components/client/Cards/GlassCard';
import { Button } from '@/components/ui/button';
import { Router } from '@/constants';
import { CirclePlusIcon } from 'lucide-react';
import Link from 'next/link';

const MyBlogPage = () => {
  return (
    <GlassCard
      title={<p className="capitalize text-lg">Bài viết của tôi</p>}
      action={
        <Button asChild className="cursor-pointer flex gap-2 items-center">
          <Link href={Router.MY_BLOG + '/create'}>
            <CirclePlusIcon />
            Tạo bài viết
          </Link>
        </Button>
      }
      className="col-span-8 mt-[60px]"
    >
      Bảng theo dõi
    </GlassCard>
  );
};

export default MyBlogPage;
