'use client';
import { keepPreviousData, queryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import QueryInf from './query-infinity';

const limit = 10;

const groupOption = (page: number, limit: number) => {
  return queryOptions({
    queryKey: ['post', { _start: page * limit, _limit: limit }],
    queryFn: async ({ queryKey }) => {
      const params = queryKey[1] as { _start: number; _limit: number };

      const res = await axios.get('https://jsonplaceholder.typicode.com/posts', { params });
      return res.data;
    },
  });
};

const TestPage = () => {
  const [page, setPage] = React.useState(0);

  const { data, isPending, isSuccess, isPlaceholderData } = useQuery({
    ...groupOption(page, limit),
    select: data => data,
    placeholderData: keepPreviousData,
    staleTime: 30_000,
    refetchOnWindowFocus: true,
  });

  console.log('isPlaceholderData', isPlaceholderData);
  return <QueryInf />;

  if (isPending) return <div>Loading...</div>;
  if (isSuccess)
    return (
      <div>
        <div>
          {data.map((item: { id: number; title: string }) => (
            <div className="bg-amber-100 my-[20px]" key={item.id}>
              {item.title}
            </div>
          ))}
        </div>
        <div className="flex">
          <button onClick={() => setPage(pre => Math.max(pre - 1, 0))}>Pre</button>
          <p>{page}</p>
          <button onClick={() => setPage(pre => Math.max(pre + 1))}>Next</button>
        </div>
      </div>
    );

  return <div>Empty</div>;
};

export default TestPage;
