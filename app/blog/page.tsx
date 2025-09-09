'use client';

import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import React from 'react';

const Blog = () => {
  const a = 10;

  return (
    <Button className="border border-red rounded-b-sm" onClick={() => toast.success('haha')}>
      click
    </Button>
  );
};

export default Blog;
