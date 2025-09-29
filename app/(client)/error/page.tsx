'use client';

import { Unauthorized } from '@/components/Errors/401';
import { Forbidden } from '@/components/Errors/403';
import { NotFound } from '@/components/Errors/404';
import { InternalServerError } from '@/components/Errors/500';
import { useSearchParams } from 'next/navigation';

const ErrorPage = () => {
  const searchParams = useSearchParams();

  const errorCode = Number(searchParams.get('errorCode'));

  switch (errorCode) {
    case 404:
      return <NotFound />;
    case 401:
      return <Unauthorized />;
    case 403:
      return <Forbidden />;
    case 500:
      return <InternalServerError />;
    default:
      return <div className="mt-[60px]">Unknow Error</div>;
  }
};

export default ErrorPage;
