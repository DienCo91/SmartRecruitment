'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { useState } from 'react';

const TestLayout = (props: LayoutProps<'/'>) => {
  const [queryClient] = useState(() => new QueryClient());
  return <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>;
};

export default TestLayout;
